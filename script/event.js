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
class Point{
	constructor(x,y){
		this.x=x
		this.y=y
	}
	toSvgPath (){
		return `${this.x} ${this.y}`
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

const managerGraphProjects = (projects) => {
	// projects est le tableaux des projects
	document.querySelector('.graph-board h1').textContent = `Pour calculer l'echelle `
	document.querySelector('.graph-board h2').textContent =`echelle =Math.round(xp/500)`
	let myData = [0, 0]
	let projectNames=["",""]
	projects.forEach(item => {
		myData.push(Math.round(item.amount / 500))
		projectNames.push(item.object.name)
	});
	let height = 600;
	let width = 600;
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
		.on('mouseover', function (d,i) {
			let xPosition = parseFloat(d3.select(this).attr('x')) + barWidth / 2;
			let yPosition = parseFloat(d3.select(this).attr('y')) + height - yScale(d/2);
			d3.select('.graph-board svg')
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
	board.textContent = 'graph skills'
	
	const colors=['#679436','#bde0fe','#606c38','#dda15e','#ccd5ae',"#264653","#2a9d8f","#e9c46a",'#f4a261',"#e76f51","#023047",'#fb8500',"#9a8c98",'#ee9b00','#001219,','#ae2012','#9b2226','#370617','#b5179e','#a47148','#99d98c',"#ccff33",'#613a3a']
	const svg=strToDom(`<svg viewBox="-1 -1 4 4" style="width: 500px; height: 500px; "></svg>`)
	board.appendChild(svg)
	let skillNames=[]
	let skillParts=[]
	const svgICreate=document.querySelector('.graph-board svg')
	const paths=skills.map((skill,k)=>{
		const color = colors[k%(colors.length-1)]
		const path=document.createElementNS('http://www.w3.org/2000/svg','path')
		path.setAttribute('fill',color)
		svgICreate.appendChild(path)
		skillNames.push(skill.type)
		skillParts.push(skill.amount)
		return path
	})
	// console.log(skillNames,"\n",skillParts);
	draw(skillParts,paths)
}

function draw(skillParts,paths) {
	const total = skillParts.reduce((acc,v) => acc+v,0)
	let angle=0
	let start=new Point(1,0)
	let ratio = skillParts[0]/total
	paths[0].setAttribute('d',`M 0 0 L ${start.toSvgPath()}`)
	console.log(total)
}
