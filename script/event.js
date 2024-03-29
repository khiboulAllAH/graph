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
					document.querySelector('.logout').addEventListener('click', () => {
						log_out(content, token)
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
			log_out(content, token)
		})
}

export const log_out = (content, token) => {
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
	graphProjects.addEventListener('click', () => {
		managerGraphProjects(data.projet, graphBoard)
	})

	graphSkills.addEventListener('click', () => {
		managerGraphSkills(data.skills, graphBoard)
	})
}

const managerGraphProjects = (projects, board) => {
	board.textContent = 'graph Projects'
	let myData = [0, 0]
	projects.forEach(item => {
		myData.push(Math.round(item.amount / 500))
	});
	console.log(myData);
	let height = d3.max(myData);
	let width = 550;
	let barWidth = 15;
	let barOffset = 5;
	// Créez une échelle de couleurs
	let colors = d3.scale.linear()
		.domain([0, myData.length])
		.range(['#ffb832', '#c61c6f']);

	// Créez une échelle linéaire pour l'axe Y
	let yScale = d3.scale.linear()
		.domain([0, d3.max(myData)])
		.range([height, 0]);

	// Créez l'axe Y
	let yAxis = d3.svg.axis()
		.scale(yScale)
		.orient('left')
		.ticks(15);

	// Ajoutez l'axe Y au SVG
	d3.select('.graph-board').append('svg')
		.attr('width', width)
		.attr('height', height)
		.style('background', '#dff0d8')
		.append('g')
		// .attr('class', 'y axis')
		.attr('transform', 'translate(37,0)')
		.call(yAxis);

	// Sélectionnez et créez les barres
	d3.select('.graph-board svg')
		.selectAll('rect')
		.data(myData)
		.enter().append('rect')
		.style('fill', function (d, i) {
			return colors(i);
		})
		.attr('width', barWidth)
		.attr('height', function (d) {
			return height - yScale(d);
		})
		.attr('x', function (d, i) {
			return i * (barWidth + barOffset);
		})
		.attr('y', function (d) {
			return yScale(d);
		})
		.on('mouseover', function (d) {
			let xPosition = parseFloat(d3.select(this).attr('x')) + barWidth / 2;
			let yPosition = parseFloat(d3.select(this).attr('y')) + height - yScale(d);

			d3.select('.graph-board svg')
				.append('text')
				.attr('id', 'tooltip' + d)
				.attr('x', xPosition)
				.attr('y', yPosition)
				.attr('text-anchor', 'middle')
				.text(d);
		})
		.on('mouseout', function (d) {
			d3.select('#tooltip' + d).remove();
		});
}

const managerGraphSkills = (skills, board) => {
	board.textContent = 'graph skills'
}