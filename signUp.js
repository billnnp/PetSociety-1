const selected = document.querySelector(".selected");
const optionsPet = document.querySelector(".options-pet")

const optionList = document.querySelectorAll(".option")

selected.addEventListener("click",() => {
    optionsPet.classList.toggle("active");
});

optionList.forEach(o => {
    o.addEventListener("click",() => {
        selected.innerHTML = o.querySelector("label").innerHTML;
        optionsPet.classList.remove("active");
    })
})