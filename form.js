const form = document.getElementById("form");

function toggleError(id, condition) {
    const errorElement = document.getElementById(id).nextElementSibling;
    if (errorElement) {
        errorElement.classList.toggle("hide", condition);
    }
}

function errorState(data) {
    toggleError("query", Object.hasOwn(data, "query"));
    toggleError("consent", Object.hasOwn(data, "consent"));
    toggleError("firstName", checkName(data.firstName));
    toggleError("lastName", checkName(data.lastName));
    toggleError("email", validateEmail(data.email));
    toggleError("message", data.message !== '');
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
        surnameErrorText.innerText = 'Please enter a valid Last Name';
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
        // store user information in local storage
        localStorage.setItem('user', JSON.stringify({
            dataName,
            dataSurname,
            dataEmail,
            request: data.query,
            message: data.message,
        }));
        setTimeout(() => window.location.href = '/contact-form-main/data.html',1000)
    } else {
        document.getElementById("modal").style.top = '-100vh'
    }
}

const handleSubmit = (event) => {
    // prevent from updating when submitting
    event.preventDefault();

    // taking data from form
    const data = Object.fromEntries(new FormData(event.target));
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