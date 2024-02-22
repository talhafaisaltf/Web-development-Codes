import React, { useEffect, useState } from "react";
import { apiBaseUrl } from "../../App";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";

const EditPost = ({ editPostId, getPosts }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editPostId) {
      // console.log(editPostId, "editPostId");
      getPostById(editPostId);
    }
  }, [editPostId]);

  const getPostById = (postId) => {
    fetch(`${apiBaseUrl}/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data?.title);
        setBody(data?.body);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updatePostFormSubmitHandler = (event) => {
    event.preventDefault();

    if (!title || !body) {
      Swal.fire("please fill the input fields !", "", "error");
      return;
    }

    setLoading(true);
    const payload = {
      title,
      body,
    };

    fetch(`${apiBaseUrl}/${editPostId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        setTitle("");
        setBody("");
        Swal.fire("Post is updated successfully!", "", "success");

        const $ = window.$;
        $("#edit-post").modal("hide");
        setLoading(false);
        getPosts();
      })
      .catch((error) => {
        console.error(error);
        Swal.fire(error, "", "error");
        setLoading(false);
      });
  };
  return (
    <div className="modal fade" id="edit-post">
      <Loader loader={loading} />
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              &times;
            </button>
            <h4 className="modal-title">Edit Post</h4>
          </div>
          <div className="modal-body">
            <form
              action=""
              method="POST"
              role="form"
              id="edit-post-form"
              onSubmit={updatePostFormSubmitHandler}
            >
              <input type="hidden" name="post_id" id="edit_post_id" />
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="edit_post_title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => {
                    e.preventDefault();
                    setTitle(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label>Body</label>
                <textarea
                  name=""
                  id="edit_post_body"
                  cols="30"
                  rows="10"
                  placeholder="Body"
                  className="form-control"
                  value={body}
                  onChange={(e) => {
                    e.preventDefault();
                    setBody(e.target.value);
                  }}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;