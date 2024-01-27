const apiBaseUrl = `https://jsonplaceholder.typicode.com/posts`;
// console.log(apiBaseUrl, "apiBaseUrl");
const tbody = document.querySelector("#todos-listing");
const createPostForm = document.getElementById("create-post-form");
const postTitleInputFeild = document.querySelector("#post_title");
const postBodyInputField = document.querySelector("#post_body");
const editPostForm = document.querySelector("#edit-post-form");
const editPostTitleField = document.querySelector("#edit_post_title");
const editPostBodyField = document.querySelector("#edit_post_body");
const editPostIdField = document.querySelector("#edit_post_id");

createPostForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const createFormBtn = document.querySelector("#create-post-form button");
    const postTitleInput = postTitleInputFeild?.value;
    const postBodyValue = postBodyInputField?.value;

    if (!postTitleInput || !postBodyValue){
        alert('Please fill the input values');
        return;
    }

    const body = {
        title: postTitleInput,
        body: postBodyValue,
    };

    createFormBtn.setAttribute("disabled", "disabled");

    fetch(apiBaseUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(body),
    })

    .then(async (data) => {
        const jsonData = await data.json();
        console.log(jsonData, "jsonData")
        postTitleInputFeild.value = "";
        postBodyInputField.value = "";
        $("#create-post").modal("hide");
        createFormBtn.removeAttribute("disabled");
        await getPosts();
    })
    .catch((error) => {
        createFormBtn.removeAttribute("disabled");
        alert("Something went wrong!");
    });
});

editPostForm.addEventListener("submit", function (e){
    e.preventDefault();
    const editPostFeildValue = editPostIdField?.value;
    const editPostBodyFieldValue = editPostBodyField?.value;
    const editPostTitleFieldValue = editPostTitleField?.value;

    if (!editPostFeildValue || !editPostBodyFieldValue || editPostTitleFieldValue){
        alert("oops something went wrong! we cannot edit the post");
        return;
    }
    const body = {
        title: editPostTitleFieldValue,
        body: editPostBodyFieldValue,
    };

    fetch(`${apiBaseUrl}/${editPostFeildValue}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(body),
    })
    .then(async (data) => {
        $("#edit-post").modal("hide");
        await getPosts();
    })
    .catch((error) => {
        console.error(error);
    });
});

const getPostId = (postId) =>{
    return fetch(`${apiBaseUrl}/${postId}`)
    .then((data) => data.json())
    .then((data) => {
        return data;
    })
    .catch(console.error);
};

const getPosts = () =>{
    return (
        fetch(apiBaseUrl)
        .then((response) => response.json())
        .then((data) => {
            let output = "";
            data?.forEach((singleData) => {
                output += `<tr>
                <td>${singleData?.id}</td>
                <td>${singleData?.userId}</td>
                <td>${singleData?.title}</td>
                <td>
                 <a class="btn btn-primary edit-btn"  href="#edit-post" data-post-id="${singleData?.id}">Edit</a>
                 </td>
                <td>
                <a href="#" class="btn btn-danger delete-btn" data-post-id="${singleData?.id}">Delete</a>
                </td>
              </tr>`;
            });
            tbody.innerHTML = output; 
        })
        .catch((error) => {console.log(error);
        })
    );
};

getPosts();

tbody.addEventListener("click", async (e) => {
    e.preventDefault();
    const currentElement = e.target;
    if(currentElement.classList.contains("delete-btn") && confirm("Are you sure")){
        const postsId = currentElement.getAttribute("data-post-id");
        fetch(`${apiBaseUrl}/${postsId}`, {method: "DELETE"})
        .then(async (data) => {
            const dataToJson = await data.json();
            getPosts();
        })
        .catch(console.error);
    }
    if (currentElement.classList.contains("#edit-btn")) {
        const postId =currentElement.getAttribute("data-post-id");
        const singleData = await getPostId(postId);
        $("#edit-post").modal("show");

        editPostTitleField.value = singleData?.title;
        editPostBodyField.value = singleData?.body;
        editPostIdField.value = singleData?.id;
    }
})