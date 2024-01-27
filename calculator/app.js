const selectallbuttons =  document.querySelector(".buttons");
const screeninput = document.querySelector(".screen");
const btnclear = document.querySelector(".btn-clear");
const selectequalbtn = document.querySelector(".btn-equal");

selectallbuttons.addEventListener("click", function(e){
    e.preventDefault();
    const currentelement = event.target;

    if(currentelement.classList.contains("btn")){
        const datanumattr = currentelement.getAttribute("data-num");
        screeninput.value += datanumattr;
    }
})

btnclear.addEventListener("click", function(e){
    e.preventDefault();
    screeninput.value = "";
})

selectequalbtn.addEventListener("click", function(e){
    e.preventDefault();
    screeninput.value = eval(screeninput.value);
})

screeninput.addEventListener("input", function(e){
    e.preventDefault();
    const currentelement = e.target;
    if(testonlyletters(currentelement.value)){
        currentelement.value = "";
    }
})

function testonlyletters(string = ""){
    return /[a-zA-Z]+$/.test(string);
}