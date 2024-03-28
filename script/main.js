import { login } from "./login.js";
import { strToDom } from "./util.js";
import { layout } from "./compenent.js";
import { mangerLogin, logique, log_out } from "./event.js";
customElements.define('login-user', login)
const content = document.querySelector('.content')
const logElement = document.createElement('login-user')
let token = ""


document.addEventListener('DOMContentLoaded', () => {
    token = localStorage.getItem('authToken')
    // console.log(token);
    if (token === null) {
        const main = document.querySelector('.main')
        if (main) {
            main.remove()
        }
        content.append(logElement)
        mangerLogin(token)
    } else {
        const login_user = document.querySelector('login-user')
        if (login_user) {
            login_user.remove()
        }
        content.append(strToDom(layout))
        logique(token)
        document.querySelector('.logout').addEventListener('click', () => {
            log_out(content, token)
        })
    }
})