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
    if (checkName(data['firstName'])) {
        document.getElementById('firstName').nextElementSibling.classList.add("hide");
    } else {
        document.getElementById('firstName').nextElementSibling.classList.remove("hide");
    }
    if (checkName(data['lastName'])) {
        document.getElementById('lastName').nextElementSibling.classList.add("hide");
    } else {
        document.getElementById('lastName').nextElementSibling.classList.remove("hide");
    }
    if (validateEmail(data['email'])) {
        document.getElementById('email').nextElementSibling.classList.add("hide");
    } else {
        document.getElementById('email').nextElementSibling.classList.remove("hide");
    }
    if (data['message'] !== '') {
        document.getElementById('message').nextElementSibling.classList.add("hide");
    } else {
        document.getElementById('message').nextElementSibling.classList.remove("hide");
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

function instantEmailCheck() {
    const instantEmail = document.getElementById('email').value;
    const emailErrorText = document.getElementById('email').nextElementSibling
    if ((!validateEmail(instantEmail) && instantEmail !== '') || instantEmail === '') {
        emailErrorText.classList.remove("hide");
    } else {
        emailErrorText.classList.add("hide");
    }
}

function instantQueryCheck() {
    const instantGeneral = document.getElementById('general');
    const instantSupport = document.getElementById('support');
    const queryErrorText = document.getElementById('query').nextElementSibling
    if (!instantGeneral.checked || !instantSupport.checked) {
        queryErrorText.classList.add("hide")
    } else {
        queryErrorText.classList.remove("hide")
    }
}

function instantMessageCheck() {
    const instantMessage = document.getElementById('message').value;
    const messageErrorText = document.getElementById('message').nextElementSibling
    if (instantMessage !== '') {
        messageErrorText.classList.add("hide")
    } else {
        messageErrorText.classList.remove("hide")
    }
}

function instantConsentCheck() {
    const instantConsent = document.getElementById('consents');
    const consentErrorText = document.getElementById('consent').nextElementSibling
    if (instantConsent.checked) {
        consentErrorText.classList.add("hide")
    } else {
        consentErrorText.classList.remove("hide")
    }
}

function successState(dataName, dataSurname, dataEmail, data) {
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