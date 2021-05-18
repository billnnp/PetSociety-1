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

// for send data to DB

function selectgender(event){
    gender = event;
}

function selectpet(event){
    pet = event;

}
function onCommit(){
    

}