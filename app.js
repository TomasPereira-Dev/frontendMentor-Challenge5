const inputs = document.querySelectorAll(".input");
const inputTitleDay = document.querySelector(".day-input-title");
const inputTitleMonth = document.querySelector(".month-input-title");
const inputTitleYear = document.querySelector(".year-input-title");
const dayInput = document.querySelector(".day-input");
const monthInput = document.querySelector(".month-input");
const yearInput = document.querySelector(".year-input");
const dayContainer = document.querySelector(".day-input-container");
const monthContainer = document.querySelector(".month-input-container");
const yearContainer = document.querySelector(".year-input-container");
const daysNumberParagraph = document.querySelector(".days-number");
const monthsNumberParagraph = document.querySelector(".months-number");
const yearsNumberParagraph = document.querySelector(".years-number");
const submitBtn = document.querySelector(".submit-btn");

const presentYear = new Date().getFullYear();
const presentMonth = new Date().getMonth() + 1; // los meses funcionan como un array de 12 indices, desde 0 a 11
const presentDay = new Date().getDate();
const thirthyDayMonths = [4,6,9,11];

const dayErrorMessage = document.createElement("p");
dayErrorMessage.textContent = "Must be a valid day";
dayErrorMessage.setAttribute("class", "error-message");
dayInput.addEventListener("input", () => {
    if(dayInput.value < 1 || dayInput.value > 31){
        dayContainer.append(dayErrorMessage);
        inputTitleDay.style.color = "hsl(0, 100%, 67%)"
    }else{
        dayErrorMessage.remove()
        inputTitleDay.style.color = "hsl(0, 1%, 44%)"
    }
});


const monthErrorMessage = document.createElement("p");
monthErrorMessage.textContent = "Must be a valid month";
monthErrorMessage.setAttribute("class", "error-message");
monthInput.addEventListener("input", () =>{
    if(monthInput.value > 12 || monthInput.value <= 0){
        monthContainer.append(monthErrorMessage);
        inputTitleMonth.style.color = "hsl(0, 100%, 67%)"
    }else{
        monthErrorMessage.remove();
        inputTitleMonth.style.color = "hsl(0, 1%, 44%)"
    }
});

const yearErrorMessage = document.createElement("p");
yearErrorMessage.textContent = "Must be in the past";
yearErrorMessage.setAttribute("class", "error-message");
yearInput.addEventListener("input", () =>{
    if(yearInput.value > presentYear){
        yearContainer.append(yearErrorMessage);
        inputTitleYear.style.color = "hsl(0, 100%, 67%)"
    }else{
        yearErrorMessage.remove();
        inputTitleYear.style.color = "hsl(0, 1%, 44%)"
    }
});

const inputsArr = Array.from(inputs);
const requiredError = document.createElement("p");
requiredError.textContent = "This field is required";
requiredError.setAttribute("class", "error-message");

const dayAndMonthErrorMessage = document.createElement("p");
dayAndMonthErrorMessage.textContent = "Must be a valid date";
dayAndMonthErrorMessage.setAttribute("class", "error-message"); 
submitBtn.addEventListener("click", () => {
    for(let j = 0; j < thirthyDayMonths.length; j++){ 
        if(monthInput.value == thirthyDayMonths[j]){
            if(dayInput.value == 31){
                dayContainer.append(dayAndMonthErrorMessage);
                inputTitleDay.style.color = "hsl(0, 100%, 67%)"
            }else if(dayInput.value < 31 && dayInput.value > 1){
            dayAndMonthErrorMessage.remove();
            inputTitleDay.style.color = "hsl(0, 1%, 44%)"
            }
        }
    }

    let validityCount = 0;
    for(let k = 0; k < inputsArr.length; k++){
        let classes = inputsArr[k].classList;
        

        if(inputsArr[k].checkValidity()){
            validityCount += 1;
            console.log(validityCount)
        }

        if(validityCount == 3){
            chronologicalAge();
            validityCount = 0;
        }

        if(!inputsArr[k].value && classes.contains("is-required")){
            inputsArr[k].parentElement.appendChild(requiredError.cloneNode(true));
            inputsArr[k].parentElement.firstElementChild.style.color = "hsl(0, 100%, 67%)";
            classes.toggle("is-required");
            
        }else if(inputsArr[k].value && !classes.contains("is-required")){
            classes.toggle("is-required");
            inputsArr[k].parentElement.lastChild.remove();
            inputsArr[k].parentElement.firstElementChild.style.color = "hsl(0, 1%, 44%)";
        }

    }
})

const chronologicalAge = () => {

    const chronoYears = presentYear - yearInput.value;
    const chronoMonths =  presentMonth - monthInput.value;
    const chronoDays = presentDay - dayInput.value;

    const negativeChronoDays =  presentDay + 30;
    const negativeChronoMonths = presentMonth + 12;
    const negativeChronoYears =  chronoYears - 1;
    let calculatedDays =  negativeChronoDays - dayInput.value;
    let calculatedMonths = negativeChronoMonths - monthInput.value;

    let dayNumber = 0;
    let monthNumber = 0;
    let yearNumber = 0;


    if(presentMonth < monthInput.value  && presentDay < dayInput.value){
        const daysIntervalAnimation = setInterval((days) => {
            daysNumberParagraph.innerHTML = `<p>${dayNumber} <span>days</span></p>`;
            dayNumber += 1;
            if (dayNumber > days) clearInterval(daysIntervalAnimation);
        }, 30, calculatedDays); 

        const monthsIntervalAnimation = setInterval((months) => {
        monthsNumberParagraph.innerHTML = `<p>${monthNumber} <span>months</span></p>`;
        monthNumber += 1;
        if(monthNumber > months) clearInterval(monthsIntervalAnimation);
        }, 30, calculatedMonths); 

        const yearsIntervalAnimation = setInterval((years) => {
            yearsNumberParagraph.innerHTML = `<p>${yearNumber} <span>years</span></p>`;
            yearNumber += 1;
            if(yearNumber > years) clearInterval(yearsIntervalAnimation);
        }, 30, negativeChronoYears); 
        
    }else if(presentMonth < monthInput.value  && presentDay >= dayInput.value){
        const daysIntervalAnimation = setInterval((days) => {
            daysNumberParagraph.innerHTML = `<p>${dayNumber} <span>days</span></p>`;
            dayNumber += 1;
            if (dayNumber > days) clearInterval(daysIntervalAnimation);
        }, 30, chronoDays); 

        const monthsIntervalAnimation = setInterval((months) => {
        monthsNumberParagraph.innerHTML = `<p>${monthNumber} <span>months</span></p>`;
        monthNumber += 1;
        if(monthNumber > months) clearInterval(monthsIntervalAnimation);
        }, 30, calculatedMonths); 

        const yearsIntervalAnimation = setInterval((years) => {
            yearsNumberParagraph.innerHTML = `<p>${yearNumber} <span>years</span></p>`;
            yearNumber += 1;
            if(yearNumber > years) clearInterval(yearsIntervalAnimation);
        }, 30, negativeChronoYears); 

    }else if(presentMonth >= monthInput.value  && presentDay < dayInput.value){
        const daysIntervalAnimation = setInterval((days) => {
            daysNumberParagraph.innerHTML = `<p>${dayNumber} <span>days</span></p>`;
            dayNumber += 1;
            if (dayNumber > days) clearInterval(daysIntervalAnimation);
        }, 30, calculatedDays); 

        const monthsIntervalAnimation = setInterval((months) => {
        monthsNumberParagraph.innerHTML = `<p>${monthNumber} <span>months</span></p>`;
        monthNumber += 1;
        if(monthNumber > months) clearInterval(monthsIntervalAnimation);
        }, 30, chronoMonths); 

        const yearsIntervalAnimation = setInterval((years) => {
            yearsNumberParagraph.innerHTML = `<p>${yearNumber} <span>years</span></p>`;
            yearNumber += 1;
            if(yearNumber > years) clearInterval(yearsIntervalAnimation);
        }, 30, chronoYears); 

    }else{
        const daysIntervalAnimation = setInterval((days) => {
            daysNumberParagraph.innerHTML = `<p>${dayNumber} <span>days</span></p>`;
            dayNumber += 1;
            if (dayNumber > days) clearInterval(daysIntervalAnimation);
        }, 30, chronoDays); 

        const monthsIntervalAnimation = setInterval((months) => {
        monthsNumberParagraph.innerHTML = `<p>${monthNumber} <span>months</span></p>`;
        monthNumber += 1;
        if(monthNumber > months) clearInterval(monthsIntervalAnimation);
        }, 30, chronoMonths); 

        const yearsIntervalAnimation = setInterval((years) => {
            yearsNumberParagraph.innerHTML = `<p>${yearNumber} <span>years</span></p>`;
            yearNumber += 1;
            if(yearNumber > years) clearInterval(yearsIntervalAnimation);
        }, 30, chronoYears); 
    }
}



