const newButton = document.querySelector("#new-btn");

console.log(newButton ,"newButton")

newButton.addEventListener("click", function (event){
    event.preventDefault();
    if(newButton.innerText === "Type email & hit enter"){
        newButton.innerText = "click the button";
    } else if (newButton.innerText === "Type email & hit enter") {
        newButton.innerText = ""
    } else{
        newButton.innerText === "Type email & hit enter"
    }
})