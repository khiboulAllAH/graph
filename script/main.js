import { login } from "./login.js";
import { getDataFormulaire, 
         CheckDataEmpty, 
         customBtoa,
         calculData } from "./util.js";
import { postData } from "./fetch.js";
import { query } from "./query.js";
customElements.define('login-user', login)
const content = document.querySelector('.content')
const logElement = document.createElement('login-user')
let token = ""

content.append(logElement)
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
                })
                .then(() => {
                    const Bearer = `Bearer ${token}`
                    postData('https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql', { query }, Bearer)
                        .then((resp) => {
                            console.log(calculData(resp.data.user[0]));
                        })
                })
        }
    }
})

window.addEventListener('DOMContentLoaded', () => {
    token = localStorage.getItem('authToken')
    if (token == "") {

        content.append(logElement)
    }
})