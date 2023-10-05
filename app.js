const inputs = document.querySelectorAll(".input");
const dayInput = document.querySelector(".day-input");
const monthInput = document.querySelector(".month-input");
const yearInput = document.querySelector(".year-input");
const dayContainer = document.querySelector(".day-input-container");
const monthContainer = document.querySelector(".month-input-container");
const yearContainer = document.querySelector(".year-input-container");
const submitBtn = document.querySelector(".submit-btn");

const presentYear = new Date().getFullYear();
const thirthyDayMonths = [4,6,9,11];

const dayErrorMessage = document.createElement("p");
dayErrorMessage.textContent = "Must be a valid date";
dayInput.addEventListener("input", () => {
    if(dayInput.value < 1 || dayInput.value > 31){
        dayErrorMessage.textContent = "Must be a valid day";
        dayContainer.append(dayErrorMessage);
    }else{
        dayErrorMessage.remove()
    }
});


const monthErrorMessage = document.createElement("p");
monthErrorMessage.textContent = "Must be a valid month";
monthInput.addEventListener("input", () =>{
    if(monthInput.value > 12 || monthInput.value <= 0 && monthInput.value){
        monthContainer.append(monthErrorMessage);
    }else{
        monthErrorMessage.remove();
    }
});

const yearErrorMessage = document.createElement("p");
yearErrorMessage.textContent = "Must be in the past";
yearInput.addEventListener("input", () =>{
    if(yearInput.value > presentYear){
        yearContainer.append(yearErrorMessage);
    }else{
        yearErrorMessage.remove();
    }
});


const dayAndMonthErrorMessage = document.createElement("p");
dayAndMonthErrorMessage.textContent = "Must be a valid date"; 
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    for(let j = 0; j < thirthyDayMonths.length; j++){ // funciona si lo haces al enviar el form, no antes
        console.log(`loop ${j}`)
        if(monthInput.value == thirthyDayMonths[j]){
            if(dayInput.value == 31){
                dayContainer.append(dayAndMonthErrorMessage);
            }else if(dayInput.value < 31 && dayInput.value > 1){
            dayAndMonthErrorMessage.remove();
            }
        }
    }
})

