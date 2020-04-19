const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = require('fs').readFileSync('./token.txt', 'utf-8');

const channels = {
	shell: '701070132654505994',
	git: '701070106985496616',
	c: '701366228052344872',
	cpp: '701366945378992177',
	c_sharp: '701366272209715290',
	java: '701366432243384350',
	python: '701064388530143293',
	html_css: '701366469862096958',
	javascript: '701064462454751273',
	ruby: '701064430133182494'
}

client.on('ready', () => {
	console.log('CAbot is on !');
});

client.login(TOKEN);