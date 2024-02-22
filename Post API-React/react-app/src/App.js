import React, { useEffect, useState } from "react";
import "./App.css";
import Swal from "sweetalert2";
import CreatePost from "./Components/CreatePost/CreatePost";
import EditPost from "./Components/EditPost/EditPost";
import Loader from "./Components/Loader/Loader";

export const apiBaseUrl = `https://jsonplaceholder.typicode.com/posts`;

function App() {
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    //it will only render on first time
    getPosts();
  }, []);

  // useEffect(() => {
  // },[postId])

  const getPosts = () => {
    setLoader(true);
    fetch(apiBaseUrl)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };

  const deletePostById = (postId) => {
    fetch(`${apiBaseUrl}/${postId}`, {
      method: "DELETE",
    })
      .then(() => {
        getPosts();
        Swal.fire("Post is deleted successfully!", "", "success");
      })
      .catch(() => {
        Swal.fire("Post is not deleted successfully!", "", "error");
      });
  };

  const deleteBtnHandler = (event, postId) => {
    event.preventDefault();
    Swal.fire({
      title: "Do you want to delete this post?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        deletePostById(postId);
      }
    });
  };

  const editBtnHandler = (event, postId) => {
    event.preventDefault();
    setEditPostId(postId);

    const $ = window.$;
    $("#edit-post").modal("show");
  };
  return (
    <React.Fragment>
      <Loader loader={loader} />
      <div className="container">
        <h1>Posts</h1>
        <a className="btn btn-primary" data-toggle="modal" href="#create-post">
          Create Post
        </a>
        <CreatePost getPosts={getPosts} />

        <EditPost editPostId={editPostId} getPosts={getPosts} />

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Post Id</th>
              <th>User Id</th>
              <th>Title</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody id="todos-listing">
            {posts?.map((singlePost) => {
              return (
                <tr key={singlePost.id}>
                  <td>{singlePost.id}</td>
                  <td>{singlePost.userId}</td>
                  <td>{singlePost.title}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={(event) => {
                        editBtnHandler(event, singlePost.id);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(event) =>
                        deleteBtnHandler(event, singlePost.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default App;