const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = require('fs').readFileSync('./token.txt', 'utf-8');

const channels = {
	general: {
		commandes_bot: '701387992991924314'
	},
	code: {
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
}

const processAdd = async (msg, channel) => {
	const permissions = {
		VIEW_CHANNEL: true,
		SEND_MESSAGES: true,
		READ_MESSAGE_HISTORY: true
	};

	if (channel in channels.code) {
		const targetChannel = await client.channels.fetch(channels.code[channel]);

		targetChannel.updateOverwrite(msg.author, permissions);
		msg.channel.send(`*Vous avez correctement été ajouté·e au channel **${channel}**.*`);
	} else {
		msg.channel.send(`Erreur: le channel **${channel}** n'existe pas.`);
	}
};

const processRemove = async (msg, channel) => {
	const permissions = {
		VIEW_CHANNEL: false,
		SEND_MESSAGES: false,
		READ_MESSAGE_HISTORY: false
	};

	if (channel in channels.code) {
		const targetChannel = await client.channels.fetch(channels.code[channel]);

		targetChannel.updateOverwrite(msg.author, permissions);
		msg.channel.send(`*Vous avez correctement été supprimé·e du channel **${channel}**.*`);
	} else {
		msg.channel.send(`*Erreur: le channel **${channel}** n'existe pas.*`);
	}
};

const processAddAll = async (msg) => {
	const permissions = {
		VIEW_CHANNEL: true,
		SEND_MESSAGES: true,
		READ_MESSAGE_HISTORY: true
	};

	for (let [key, value] of Object.entries(channels.code)) {
		const targetChannel = await client.channels.fetch(value);

		targetChannel.updateOverwrite(msg.author, permissions);
	}
	msg.channel.send('*Vous avez correctement été ajouté·e à tous les channels disponibles.*');
}

const processRemoveAll = async (msg) => {
	const permissions = {
		VIEW_CHANNEL: false,
		SEND_MESSAGES: false,
		READ_MESSAGE_HISTORY: false
	};

	for (let [key, value] of Object.entries(channels.code)) {
		const targetChannel = await client.channels.fetch(value);

		targetChannel.updateOverwrite(msg.author, permissions);
	}
	msg.channel.send('*Vous avez correctement été supprimé·e de tous les channels disponibles.*');
}

const processList = (msg) => {
	let list = ``

	Object.keys(channels.code).forEach((channel) => {
		list += `**${channel}**\n`
	})
	msg.channel.send("Liste des channels disponibles :\n" + list);
};

const processCommand = (msg) => {
	const command = msg.content.split(' ');

	const commandsAvailable = ' `help`		*affiche la liste des commandes disponibles*\n \
`add [nom_du_channel]`		*vous ajoute au channel passé en paramètre*\n \
`addall`		*vous ajoute à tous les channels existants*\n \
`remove [nom_du_channel]`		*vous supprime du channel passé en paramètre*\n \
`removeall`		*vous supprime de tous les channels existants*\n \
`list`		*liste les channels existants*';
	if (command[0] === 'add' && command.length == 2)
		processAdd(msg, command[1].toLowerCase());
	else if (command[0] === 'remove' && command.length == 2)
		processRemove(msg, command[1].toLowerCase());
	else if (command[0] === 'addall' && command.length == 1)
		processAddAll(msg);
	else if (command[0] === 'removeall' && command.length == 1)
		processRemoveAll(msg);
	else if (command[0] === 'list' && command.length == 1)
		processList(msg);
	else if (command[0] === 'help' && command.length == 1)
		msg.channel.send(commandsAvailable);
	else
		msg.channel.send('Commande invalide. Les commandes possibles sont:\n' + commandsAvailable)
};

client.on('message', (msg) => {
	if (msg.author.bot === false) {
		if (msg.channel.id === channels.general.commandes_bot) {
			processCommand(msg);
		}
	}
});

client.on('ready', () => {
	console.log('CAbot is on !');
});

client.login(TOKEN);