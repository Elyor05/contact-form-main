const dataUser = JSON.parse(localStorage.getItem('user'))

const name = dataUser.dataName
const surname = dataUser.dataSurname
const email = dataUser.dataEmail
const request = dataUser.request
const message = dataUser.message

document.title = `${name}'s Data`
document.getElementById('fullName').innerText = `Full Name: ${surname} ${name}`
document.getElementById('email').innerText = `Email: ${email}`
document.getElementById('request').innerText = `Type of request: ${request === 'general' ? 'General Enquiry' : 'Support Request'}`
document.getElementById('message').innerText = `Your Message: ${message}`