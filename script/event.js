import { postData } from "./fetch.js";
import { query } from "./query.js";
import { calculData } from "./util.js";
let finalData={}
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
		.then(()=>{
			console.log(finalData);
			injectData(finalData)
		})
}

export const log_out=(content,login)=>{
	localStorage.removeItem('authToken')
	const main = document.querySelector('.main')
	if (main) {
		main.remove()
	}
	content.append(login)
}

export const injectData=(data)=>{
	const name=document.querySelector('.logo')
	const projet=document.querySelector('.projet')
	const level=document.querySelector('.level')
	const campus=document.querySelector('.campus')
	const zone=document.querySelector('.zone')
	const mail=document.querySelector('.mail')
	const xp=document.querySelector('.xp')
	name.textContent=`${data.firstName} ${data.lastName}`
	projet.textContent=`${data.projet.length}`
	level.textContent=`${data.projet.length}`
	campus.textContent=`${data.campus}`
	zone.textContent=`Zone01 ${data.campus}`
	mail.textContent=`${data.mail}`
	mail.style.wordBreak= "break-all";
	xp.textContent=`${data.xp}`
}