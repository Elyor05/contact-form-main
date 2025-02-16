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
    if (checkName(dataName) && checkName(dataSurname) && validateEmail(dataEmail) && data.query && data.message && data.consent) {
        document.getElementById("modal").style.top = '10px'
    } else {
        document.getElementById("modal").style.top = '-100vh'
    }

}
form.addEventListener("submit", handleSubmit);