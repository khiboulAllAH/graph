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
class Point {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
	toSvgPath() {
		return `${this.x} ${this.y}`
	}

	static fromAngle(angle) {
		return new Point(Math.cos(angle), Math.sin(angle));
	}
}

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
	managerLogin(token,svg)
}

export const injectData = (data) => {
	const name = document.querySelector('.logo')
	const NumberProjet = document.querySelector('.projet')
	const level = document.querySelector('.level')
	const campus = document.querySelector('.campus')
	const zone = document.querySelector('.zone')
	const mail = document.querySelector('.mail')
	const xp = document.querySelector('.xp')
	const graphBoard = document.querySelector('.boardSkills')
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
		const skill = document.querySelector('.boardSkills')
		const projet = document.querySelector('.boardProject')
		skill.style.display = "none"
		projet.style.display = "flex"
		skill.innerHTML = ''
		projet.innerHTML = ''
		managerGraphProjects(data.projet)
	})
	graphSkills.addEventListener('click', () => {
		const skill = document.querySelector('.boardSkills')
		const projet = document.querySelector('.boardProject')
		skill.style.display = "flex"
		projet.style.display = "none"
		skill.innerHTML = ''
		projet.innerHTML = ''
		managerGraphSkills(data.skills, graphBoard)
	})
}

const managerGraphProjects = (projects) => {
	// projects est le tableaux des projects
	document.querySelector('.boardProject').appendChild(strToDom(`<h1">Graph's  Valid Projects<h1/>`))
	let myData = [0, 0]
	let projectNames = ["", ""]
	projects.forEach(item => {
		myData.push(Math.round(item.amount / 500))
		projectNames.push(item.object.name)
	});
	let height = d3.max(myData) * 1.5;
	let width = 580;
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
		.ticks(30);

	// Ajoutez l'axe Y au SVG
	d3.select('.boardProject').append('svg')
		.attr('width', width)
		.attr('height', height)
		.style('background', '#dff0d8')
		.append('g')
		// .attr('class', 'y axis')
		.attr('transform', 'translate(37,0)')
		.call(yAxis);

	// Sélectionnez et créez les barres
	d3.select('.boardProject svg')
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
		.on('mouseover', function (d, i) {
			let xPosition = parseFloat(d3.select(this).attr('x')) + barWidth / 2;
			let yPosition = parseFloat(d3.select(this).attr('y')) + height - yScale(d / 2);
			d3.select('.boardProject svg')
				.append('text')
				.attr('id', 'tooltip' + d)
				.attr('x', xPosition)
				.attr('y', yPosition)
				.attr('text-anchor', 'middle')
				.text(projectNames[i]);
		})
		.on('mouseout', function (d) {
			d3.select('#tooltip' + d).remove();
		});
}

const managerGraphSkills = (skills, board) => {
	board.appendChild(strToDom(`<h1">Graph's  Skills<h1/>`))
	const colors = ['#679436', '#bde0fe', '#606c38', '#dda15e', '#ccd5ae', "#264653", "#2a9d8f", "#e9c46a", '#f4a261', "#e76f51", "#023047", '#fb8500', "#9a8c98", '#ee9b00', '#001219,', '#ae2012', '#9b2226', '#370617', '#b5179e', '#a47148', '#99d98c', "#ccff33", '#613a3a']
	const svg = strToDom(`<svg viewBox="-1 -1 2 2" style="width: 500px; height: 500px;" class="svgSkills">
						<g mask="url(#graphMask)">
						</g>
						<mask id="graphMask">
							<rect fill="white" x="-1" y="-1" width="2" height="2"/>
							<circle r="0.03" fill="black"/>
						</mask>
						</svg>`)
	board.appendChild(svg.firstChild)
	let skillNames = []
	let skillParts = []
	// const svgICreate=document.querySelector('.svgSkills')
	const pathGroup = document.querySelector('svg g')
	const maskGroup = document.querySelector('svg mask')
	// c'est pour partionner le cercle
	const paths = skills.map((skill, k) => {
		const color = colors[k % (colors.length - 1)]
		const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
		path.setAttribute('fill', color)
		pathGroup.appendChild(path)
		skillNames.push(skill.type)
		skillParts.push(skill.amount)
		// start pour faire les labels
		path.classList.add(skill.type)
		path.setAttribute('data',skill.amount)
		path.setAttribute('color',color)
		// end
		return path
	})
	//  c'est pour les masks c'est à dire la séparation entre les partion de couleur et du centre
	const lines = skills.map(() => {
		const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
		line.setAttribute('stroke', "#000")
		line.setAttribute('stroke-width', "0.01")
		line.setAttribute('x1', '0')
		line.setAttribute('y1', '0')
		maskGroup.appendChild(line)
		return line
	})
	// c'est pour faire des labels pour la survol de chaque partition du cercle
	// const labels = skillNames.map((name) => {
	// 	const skill = document.querySelector('.boardSkills')
	// 	const labelName = document.createElement('div')
	// 	labelName.innerText = name
	// 	labelName.classList.add('label')
	// 	skill.appendChild(labelName)
	// 	return labelName
	// })

	draw(skillParts, paths, lines)
	board.appendChild(strToDom(`<h1 class="nameLabel"><h1/>`))
	overSkills()
}

function draw(skillParts, paths, lines) {
	const total = skillParts.reduce((acc, v) => acc + v, 0)
	let angle = 0
	let start = new Point(1, 0)
	for (let i = 0; i < skillParts.length; i++) {
		const ratio = skillParts[i] / total
		// positionLabel(labels[i], angle + ratio * Math.PI)
		angle += (ratio) * 2 * Math.PI
		const end = Point.fromAngle(angle)
		const largeFlag = ratio > .5 ? '1' : '0'
		paths[i].setAttribute('d', `M 0 0 L ${start.toSvgPath()} A 1 1 0 ${largeFlag} 1 ${end.toSvgPath()}`)
		// console.log(total)
		lines[i].setAttribute('x2', end.x)
		lines[i].setAttribute('y2', end.y)
		start = end
	}
}

// function positionLabel(label, angle) {
// 	if (!label || !angle) {
// 		return
// 	}
// 	const point = Point.fromAngle(angle)
// 	label.style.setProperty('top', `${(point.y * 0.5 + 0.5) * 100}%`)
// 	label.style.setProperty('left', `${(point.x * 0.5 + 0.5) * 100}%`)
// }

function overSkills(svg) {
	document.addEventListener('mouseover',(e)=>{
		e.preventDefault()
		const element=e.target
		const label=element.classList
		if (label.value.includes('skill_')) {
			const nameLabel=document.querySelector('.nameLabel')
			nameLabel.innerHTML=`${label.value.split('_')[1]} <br/> ${element.getAttribute('data')}%`
			nameLabel.style.color=element.getAttribute('color')
		}
		
	})
}