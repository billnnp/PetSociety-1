window.onload = pageLoad;
const { METHODS } = require("node:http");

const selected = document.querySelector(".selected");
const optionsPet = document.querySelector(".options-pet")

const optionList = document.querySelectorAll(".option")

let Gender = "", Pet = "";

selected.addEventListener("click",() => {
    optionsPet.classList.toggle("active");
});

optionList.forEach(o => {
    o.addEventListener("click",() => {
        selected.innerHTML = o.querySelector("label").innerHTML;
        optionsPet.classList.remove("active");
    })
})

//pageload
function pageLoad(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.get("error") ==1){
        if(window.location.href.split('/').pop()== "signUp.html"){
            document.getElementById('errordisplay').innerHTML = "Registration Error!"
        }
    }
}


// save data to varchar

function selectgender(event){
    gender = event;
}

function selectpet(){
    let pet = document.getElementById("Pettype").value;
}
function onCommit(){
    

}