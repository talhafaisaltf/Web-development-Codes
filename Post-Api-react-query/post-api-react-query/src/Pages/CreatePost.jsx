import { Button,
  DatePicker,
  Form,
  Input,
  Select,
  Typography,
  notification,
 } from 'antd';
import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { apiBaseUrl } from '../constant';
import moment from 'moment';
import CustomDragger from '../components/CustomDragger/CustomDragger';

function CreatePost() {

  const [api, contextHolder] = notification.useNotification();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data: categoryResponse, isLoading: categoryLoader } = useQuery(
    "categories",
    () => fetch(`${apiBaseUrl}/categories`).then((res) => res.json())
  );

  const categoryData = categoryResponse?.results;

  const { mutateAsync: createPostRequest, isLoading: createPostLoader } =
      useMutation("createPost", (payLoad) => fetch(`${apiBaseUrl}/posts`,{
        method: "POST",
        body: payLoad,
      }).then((res) => res.json())
      );

  const onFinish = (values) => {
    const payLoad = { ...values };
    payLoad.post_date = moment(payLoad.post_date);

    const formData = new FormData();
    Object.entries(payLoad).forEach((singleArray) => {
      const [key, value ] = singleArray;
      formData.append(key, value);
    });

    if (file) {
        formData.append("post_image", file);
    }

    
    createPostRequest(formData, {
      onSuccess: () => {
        form.resetFields();
        api.open({
          message: "Success",
          description: "Post is created successfully",
          duration: 1,
        });
        setTimeout(() => {
          navigate("/");
        }, [2000]);
      },
    });
  };

  const filterOption = (input, option ) => (option?.children ?? "").toLowerCase().includes(input.toLowerCase());

  const imagefunction = (fileParam) => {
    setFile(fileParam);
  };
  return (
    <div className="container">
      {contextHolder}
      <Typography.Title>Create Post</Typography.Title>
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
          <CustomDragger customFunction={imagefunction} />
        </Form.Item>

        <Form.Item
          style={{
            marginTop: 20,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={createPostLoader || categoryLoader}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreatePost;
