import { login } from "./login.js";
import { getDataFormulaire, CheckDataEmpty } from "./util.js";

customElements.define('login-user', login)
const content = document.querySelector('.content')
const logElement = document.createElement('login-user')

const main = () => {
    content.append(logElement)
    document.addEventListener('click', (e) => {
        e.preventDefault()
        const login_user = document.querySelector('login-user')
        if (login_user) {
            const shadow = login_user.shadowRoot
            const idForm = shadow.getElementById("form");
            const data = getDataFormulaire(idForm);
            if (CheckDataEmpty(data)) {
                console.log(data);
            }
        }
    })
}

main()