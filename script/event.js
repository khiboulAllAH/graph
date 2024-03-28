import { postData } from "./fetch.js";
import { query } from "./query.js";
import {
	getDataFormulaire,
	CheckDataEmpty,
	customBtoa,
	strToDom,
	calculData
} from "./util.js";
import { layout } from "./compenent.js";

let finalData = {}

export const managerLogin = (token) => {
    const login_user = document.querySelector('login-user')
	const content = document.querySelector('.content')
	const shadow = login_user.shadowRoot
	shadow.querySelector('#Login').addEventListener('click', (e) => {
		e.preventDefault()
		const idForm = shadow.getElementById("form");
		const error = shadow.getElementById('error-out')
		const data = getDataFormulaire(idForm);
		if (CheckDataEmpty(data)) {
			console.log('yes')
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
					document.querySelector('.logout').addEventListener('click',()=>{
						log_out(content,token)
					})
				})
		}
	})
}


export function logique(token) {
	const Bearer = `Bearer ${token}`
	postData('https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql', { query }, Bearer)
		.then((resp) => {
			finalData = calculData(resp.data.user[0])
			let menuicn = document.querySelector(".menuicn");
			let nav = document.querySelector(".navcontainer");
			if (nav) {
				menuicn.addEventListener("click", () => {
					nav.classList.toggle("navclose");
				})
			}
		})
		.then(() => {
			console.log(finalData);
			injectData(finalData)
		})
		.catch((error) => {
			const content = document.querySelector('.content')
			log_out(content,token)
		})
}

export const log_out = (content,token) => {
	localStorage.removeItem('authToken')
	const main = document.querySelector('.main')
	if (main) {
		main.remove()
	}
	content.append(document.createElement('login-user'))
	managerLogin(token)
}

export const injectData = (data) => {
	const name = document.querySelector('.logo')
	const NumberProjet = document.querySelector('.projet')
	const level = document.querySelector('.level')
	const campus = document.querySelector('.campus')
	const zone = document.querySelector('.zone')
	const mail = document.querySelector('.mail')
	const xp = document.querySelector('.xp')
	const graphBoard = document.querySelector('.graph-board')
	const graphSkills = document.querySelector(".option2")
	const graphProjects = document.querySelector(".option3")
	name.textContent = `${data.firstName} ${data.lastName}`
	NumberProjet.textContent = `${data.projet.length}`
	level.textContent = `${data.grade}`
	campus.textContent = `${data.campus}`
	zone.textContent = `Zone01 ${data.campus}`
	mail.textContent = `${data.mail}`
	mail.style.wordBreak = "break-all";
	xp.textContent = `${data.xp}`
	graphProjects.addEventListener('click',()=>{
		managerGraphProjects(data.projects,graphBoard)
	})

	graphSkills.addEventListener('click',()=>{
		managerGraphSkills(data.skills,graphBoard)
	})
}

const managerGraphProjects=(projects,board)=>{
	board.textContent='graph Projects'
}

const managerGraphSkills=(skills,board)=>{
	board.textContent='graph skills'
}