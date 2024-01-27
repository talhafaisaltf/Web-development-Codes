
const taskInputForm = document.querySelector("#task-form")

taskInputForm.addEventListener("submit", function (event){
  event.preventDefault();
  console.log(event, "form is submited");
  const selectTaskInput = document.querySelector("#task");
  const taskInputValue = selectTaskInput.value;
  if(!taskInputValue){
    alert("please fill the task input field");
    return;
  }

  const collection = document.querySelector(".collection");

  const createLiElement = document.createElement("li");
  createLiElement.className = "collection-item";
  createLiElement.innerHTML = ` ${taskInputValue}
                  <a href="#" class="delete-item secondary-content">
                    <i class="fa fa-remove"></i>
                  </a>`;
  collection.append(createLiElement);

  selectTaskInput.value = "";
})

const selectCollection = document.querySelector(".collection")

selectCollection.addEventListener("click", function (e) {
  e.preventDefault();
  if (event.target.className === "fa fa-remove"){
    if (confirm("Are you sure?")){
      event.target.parentElement.parentElement.remove();
    }
  }
})

const selectcleartaskbtn = document.querySelector(".clear-tasks");

selectcleartaskbtn.addEventListener("click", function(e){
  e.preventDefault();
  if (confirm("Are you sure?")){
    const collection = document.querySelector(".collection");
    collection.innerHTML = "";
  }
})

const filterinput = document.querySelector("#filter");

filterinput.addEventListener("keyup", function (e) {
  const currentElement = e.target;
  const filterInputValue = currentElement.value;
  const selectAllCollectionItems = document.querySelectorAll(".collection-item");
  
  selectAllCollectionItems.forEach(function (singleLiElement){
        if (
          singleLiElement.innerText
            .toLowerCase()
            .indexOf(filterInputValue.toLowerCase()) === -1
        ) {
          singleLiElement.style.display = "none";
        } else {
          singleLiElement.style.display = "block";
        }
      });
    });
