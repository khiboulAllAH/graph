import { login } from "./login.js";
import {
    getDataFormulaire,
    CheckDataEmpty,
    customBtoa,
    strToDom
} from "./util.js";
import { postData } from "./fetch.js";
import { layout } from "./compenent.js";
import { logique, log_out } from "./event.js";
customElements.define('login-user', login)
const content = document.querySelector('.content')
const logElement = document.createElement('login-user')
let token = ""

document.addEventListener('click', (e) => {
    e.preventDefault()
    const login_user = document.querySelector('login-user')
    if (login_user) {
        const shadow = login_user.shadowRoot
        const idForm = shadow.getElementById("form");
        const error = shadow.getElementById('error-out')
        const data = getDataFormulaire(idForm);
        if (CheckDataEmpty(data)) {
            const credentials = `Basic ${customBtoa(`${data.nickname_email}:${data.password}`)}`
            postData('https://learn.zone01dakar.sn/api/auth/signin', "", credentials)
                .then((response) => {
                    if (response.error) {
                        error.textContent = response.error
                        return
                    }
                    token = response
                    localStorage.setItem('authToken', token)
                    login_user.remove()
                    content.append(strToDom(layout))
                    logique(token)
                })
        }
    } else {
        console.log();
        if (e.target.parentNode.classList.contains('logout')) {
            e.preventDefault()
            log_out(content, logElement);
            console.log('yes');
        }
    }
})





document.addEventListener('DOMContentLoaded', () => {
    token = localStorage.getItem('authToken')
    // console.log("token == ", token);
    if (token === null) {
        const main = document.querySelector('.main')
        if (main) {
            main.remove()
        }
        content.append(logElement)
    } else {
        const login_user = document.querySelector('login-user')
        if (login_user) {
            login_user.remove()
        }
        content.append(strToDom(layout))
        logique(token)
    }
})