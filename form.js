const form = document.getElementById("form");

function errorState(data) {
    if (!Object.hasOwn(data, 'query')) {
        document.getElementById("query").nextElementSibling.classList.remove("hide");
    } else {
        document.getElementById("query").nextElementSibling.classList.add("hide");
    }
    if (!Object.hasOwn(data, 'consent')) {
        document.getElementById("consent").nextElementSibling.classList.remove("hide");
    } else {
        document.getElementById("consent").nextElementSibling.classList.add("hide");
    }

    for (const dataKey in data) {
        if (data[dataKey] === '') {
            document.getElementById(`${dataKey}`).nextElementSibling.classList.remove("hide");
            if (dataKey === 'firstName') {
                document.getElementById('firstName').nextElementSibling.innerText = 'This field is required';
            }
            if (dataKey === 'lastName') {
                document.getElementById('lastName').nextElementSibling.innerText = 'This field is required';
            }
        } else {
            document.getElementById(`${dataKey}`).nextElementSibling.classList.add("hide");
        }
    }
}

function checkName(name) {
    return /^[\p{L}]+$/u.test(name);
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // return true or false
    return emailPattern.test(email);
}

function instantNameCheck() {
    const instantName = document.getElementById('firstName').value;
    const nameErrorText = document.getElementById('firstName').nextElementSibling
    if (!checkName(instantName) && instantName !== '') {
        nameErrorText.classList.remove("hide");
        nameErrorText.innerText = 'Please enter a valid First Name';
    } else if (instantName === '') {
        nameErrorText.classList.remove("hide");
        nameErrorText.innerText = 'This field is required';
    } else {
        nameErrorText.classList.add("hide");
    }
}

function instantSurnameCheck() {
    const instantSurname = document.getElementById('lastName').value;
    const surnameErrorText = document.getElementById('lastName').nextElementSibling
    if (!checkName(instantSurname) && instantSurname !== '') {
        surnameErrorText.classList.remove("hide");
        surnameErrorText.innerText = 'Please enter a valid First Name';
    } else if (instantSurname === '') {
        surnameErrorText.classList.remove("hide");
        surnameErrorText.innerText = 'This field is required';
    } else {
        surnameErrorText.classList.add("hide");
    }
}

function successState(dataName, dataSurname, dataEmail, data) {
    if (!validateEmail(dataEmail) && dataEmail !== '') {
        document.getElementById('email').nextElementSibling.classList.remove("hide");
    }

    if (checkName(dataName) && checkName(dataSurname) && validateEmail(dataEmail) && data.query && data.message && data.consent) {
        document.getElementById("modal").style.top = '10px'
    } else {
        document.getElementById("modal").style.top = '-100vh'
    }
}

const handleSubmit = (e) => {
    // prevent from updating when submitting
    e.preventDefault();

    // taking data from form
    const data = Object.fromEntries(new FormData(e.target));
    // check if data is not empty
    errorState(data)

    // fields to check
    const dataName = data.firstName;
    const dataSurname = data.lastName;
    const dataEmail = data.email;

    // success state
    successState(dataName, dataSurname, dataEmail, data);

}
form.addEventListener("submit", handleSubmit);