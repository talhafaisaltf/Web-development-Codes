import {  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Spin,
  Typography,
  notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constant';
import CustomDragger from "../components/CustomDragger/CustomDragger";
import moment from "moment";

function Edit() {

  const { postId } = useParams();
  const [file, setFile] = useState(null);
  const [ api, contextHolder ] = notification.useNotification();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data: category, isLoading: Loader } = useQuery(
    "categories",
    () => fetch(`${apiBaseUrl}/categories`).then((res) => res.json())
  );

  const categoryData = category?.results;

  const { data: editResponse, isLoading: editPostLoader } = useQuery(
    ["post", postId],
    () => {
     fetch(`${apiBaseUrl}/posts/${postId}`).then((res) => res.json());
    },
    {
      enabled: Boolean(postId) && Boolean(categoryData),
    }
  );

  const editPostData = editResponse?.results;

  useEffect(() => {
    if (editPostData) {
      form.setFieldsValue({
        post_title: editPostData?.post_title,
        post_category_id: editPostData?.post_category_id,
        post_author: editPostData?.post_author,
        post_date: moment(editPostData?.post_date),
        post_content: editPostData?.post_content,
        post_status: editPostData?.post_status,
        post_tags: editPostData?.post_tags,
      });
    }
  }, [editPostData]);

  const { mutateAsync: updatePostReq, isLoading: updatePostLoader } =
    useMutation(["updatePost", postId], (payLoad) => 
    fetch(`${apiBaseUrl}/posts/${postId}`, {
      method: "PUT",
      body: payLoad,
    }).then((res) => res.json())
    );

  const onFinish = (values) => {
    const payLoad = { ...values };
    payLoad.post_date = moment(payLoad.post_date);

    const formData = new FormData();
    Object.entries(payLoad).forEach((singleArray) => {
      const [key,value ] = singleArray;
      formData.append(key, value);
    });

    if (file) {
      formData.append("post_image", file);
    }

    updatePostReq(formData, {
      onSuccess:() => {
        form.resetFields();
        api.open({
          message: "Success",
          description: "Post is updated successfully",
          duration: 1,
        });
        setTimeout(() => {
          navigate("/");
        }, [2000]);
      },
    });
  }

  const filterOption = (input, option) => 
  ( option?.children ?? "").toLowerCase().includes(input.toLowerCase());

  const uploadImageFunction = (fileParam) => {
    setFile(fileParam);
  };


  return (
    <div className="container">
      <Spin spinning={updatePostLoader || Loader || editPostLoader}>
        {contextHolder}
        <Typography.Title>Edit Post</Typography.Title>
        <Form
          form={form}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="post_title"
            rules={[
              {
                required: true,
                message: "Please input your post_title!",
              },
            ]}
          >
            <Input placeholder="Post Title" />
          </Form.Item>

          <Form.Item
            name="post_author"
            rules={[
              {
                required: true,
                message: "Please input your post_author!",
              },
            ]}
          >
            <Input placeholder="Post Author" />
          </Form.Item>

          <Form.Item
            name="post_date"
            rules={[
              {
                required: true,
                message: "Please input your post_date!",
              },
            ]}
          >
            <DatePicker className="w-100" placeholder="Post Date" />
          </Form.Item>

          <Form.Item
            name="post_content"
            rules={[
              {
                required: true,
                message: "Please input your post_content!",
              },
            ]}
          >
            <Input.TextArea placeholder="Post Content" />
          </Form.Item>

          <Form.Item
            name="post_status"
            rules={[
              {
                required: true,
                message: "Please input your post_status!",
              },
            ]}
          >
            <Select placeholder="Post Status">
              <Select.Option value="draft">Draft</Select.Option>
              <Select.Option value="publish">Publish</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="post_category_id"
            rules={[
              {
                required: true,
                message: "Please input your post_category!",
              },
            ]}
          >
            <Select
              placeholder="Post Category"
              showSearch
              filterOption={filterOption}
            >
              {categoryData?.length > 0 &&
                categoryData?.map((singleCategory) => {
                  return (
                    <Select.Option value={singleCategory?.cat_id}>
                      {singleCategory?.cat_title}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>

          <Form.Item
            name="post_tags"
            rules={[
              {
                required: true,
                message: "Please input your post_tags!",
              },
            ]}
          >
            <Input placeholder="Post Tags" />
          </Form.Item>

          <Form.Item>
            <CustomDragger customFunction={uploadImageFunction} />
          </Form.Item>

          {editPostData?.image && (
            <img
              src={editPostData?.image}
              width={200}
              style={{ marginBottom: 10 }}
            />
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={updatePostLoader || Loader || editPostLoader}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
}

export default Edit;