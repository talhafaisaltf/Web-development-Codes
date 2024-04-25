import React from 'react'
import { apiBaseUrl } from "../constant";
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Row, Popconfirm, Table, notification } from "antd";

function Post() {

  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
    const {data : posts, isLoading: postLoading, refetch: getPostAgain} = useQuery('posts',() => {
        fetch(`${apiBaseUrl}/posts`)
        .then ((res) => res.json())
    });
    // console.log(postLoading, "postLoading");
    // console.log(posts, "posts");

    const { isLoading: deletePostLoader, mutateAsync: postDeleteRequest }= useMutation("deletePost", (postId) => 
     fetch(`${apiBaseUrl}/posts/${postId}`,{ 
     method: "DELETE",
    }).then((res) => res.json())
    );
    
    const postDeleteHandler = (postId) => {
      postDeleteRequest(postId, {
        onSuccess: () => {
          api.open({
            message: "Success",
            description: "Post is Deleted Successfully",
            duration: 3,
          });
          getPostAgain();
        },
      });
    };

    const columns = [
      {
        title: "Post Id",
        render: (singlePost) => { return singlePost.id;},
      },
      {
        title: "Post Title",
        dataIndex: "post_title",
      },
      {
        title: "Post Date",
        dataIndex: "post_date"
      },
      {
        title: "Post Image",
        render: (singlePost) => {
          if (!singlePost?.image){
            return "Not Found!";
          }
          return <img src={singlePost?.image} width="100" />;
        },
      },
      {
        title: "Actions",
        render: (singlePost) => {
         return(
         <>
          <Button
            type="primary"
            onClick={() => {
              navigate(`edit-post/${singlePost?.id}`);
            }}
          >
            Edit
          </Button>{" "}
          <Popconfirm
            title="Delete the post"
            description="Are you sure to delete this post?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => postDeleteHandler(singlePost.id)}
          >
            <Button
              type="default"
              // onClick={() => postDeleteHandler(singlePost.id)}
            >
              Delete
            </Button>
          </Popconfirm>
        </>
      );
    },
  },
];
    return (
      <div className="container">
      <Row justify="space-between" align="middle">
        <Col>
          <h1>Posts</h1>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => {
              navigate("/post/create-post");
            }}
          >
            Create Post
          </Button>
          {/* <Link to="/post/create-post">Create Post</Link> */}
        </Col>
      </Row>
      <Table
        loading={postLoading || deletePostLoader}
        dataSource={posts?.results}
        columns={columns}
        // pagination={false}
        rowKey={(singlePost) => singlePost.id}
      />
      {contextHolder}
    </div>
  );
}


export default Post;
