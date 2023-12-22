document.forms['acc-form'].onsubmit = function (event) {
    var check = true
    if (this.email.value.trim() === "") {
        document.querySelector(".email-error").innerHTML = "Please add valid email address";
        document.querySelector(".email-error").style.display = "block";
        document.querySelector("#email").style.border = "2px solid red";
        event.preventDefault();
        check = false;
    }

    if (this.password.value.trim() === "") {
        document.querySelector(".password-error").innerHTML = "Password must have a numeric value";
        document.querySelector(".password-error").style.display = "block";
        document.querySelector("#pwd").style.border = "2px solid red";
        event.preventDefault();
        check = false;
    }

    return check;



}
const yearSelect = document.getElementById("year");
const monthSelect = document.getElementById("month");
const daySelect = document.getElementById("day");

const months = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'];

//Months are always the same
(function populateMonths() {
    for (let i = 0; i < months.length; i++) {
        const option = document.createElement('option');
        option.textContent = months[i];
        monthSelect.appendChild(option);
        monthSelect.style.fontSize = "12px";
    }
    monthSelect.value = "January";
})();

let previousDay;

function populateDays(month) {
    //Delete all of the children of the day dropdown
    //if they do exist
    while (daySelect.firstChild) {
        daySelect.removeChild(daySelect.firstChild);
    }
    //Holds the number of days in the month
    let dayNum;
    //Get the current year
    let year = yearSelect.value;

    if (month === 'January' || month === 'March' ||
        month === 'May' || month === 'July' || month === 'August'
        || month === 'October' || month === 'December') {
        dayNum = 31;
    } else if (month === 'April' || month === 'June'
        || month === 'September' || month === 'November') {
        dayNum = 30;
    } else {
        //Check for a leap year
        if (new Date(year, 1, 29).getMonth() === 1) {
            dayNum = 29;
        } else {
            dayNum = 28;
        }
    }
    //Insert the correct days into the day <select>
    for (let i = 1; i <= dayNum; i++) {
        const option = document.createElement("option");
        option.textContent = i;
        daySelect.appendChild(option);
        daySelect.style.fontSize = "12px";
    }
    if (previousDay) {
        daySelect.value = previousDay;
        if (daySelect.value === "") {
            daySelect.value = previousDay - 1;
        }
        if (daySelect.value === "") {
            daySelect.value = previousDay - 2;
        }
        if (daySelect.value === "") {
            daySelect.value = previousDay - 3;
        }
    }
}

function populateYears() {
    //Get the current year as a number
    let year = new Date().getFullYear();
    //Make the previous 100 years be an option
    for (let i = 0; i < 101; i++) {
        const option = document.createElement("option");
        option.textContent = year - i;
        yearSelect.appendChild(option);
        yearSelect.style.fontSize = "12px";
    }
}

populateDays(monthSelect.value);
populateYears();

yearSelect.onchange = function () {
    populateDays(monthSelect.value);
}
monthSelect.onchange = function () {
    populateDays(monthSelect.value);
}
daySelect.onchange = function () {
    previousDay = daySelect.value;
}