const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = require('fs').readFileSync('./token.txt', 'utf-8');

client.on('ready', () => {
	console.log('CAbot is on !');
});

client.login(TOKEN);