const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const cowoncyData = require('../data/cowoncy.json');

module.exports = {
    name: 'cowoncy',
    description: 'Displays your current cowoncy balance',
    execute(message, args) {
        const userId = message.author.id;
        const balance = cowoncyData[userId] ? cowoncyData[userId].balance : 0;

        const embed = new MessageEmbed()
            .setColor('#ff9900')
            .setTitle('Cowoncy Balance')
            .setDescription(`You have ${balance} cowoncy 🐮`);

        message.channel.send({ embeds: [embed] });
    },
};