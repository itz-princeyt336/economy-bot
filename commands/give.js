const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const cowoncyData = require('../data/cowoncy.json');

module.exports = {
    name: 'give',
    description: 'Give cowoncy to another user',
    execute(message, args) {
        const userId = message.author.id;
        const targetUser = message.mentions.users.first();
        const amount = parseInt(args[1], 10);

        if (!targetUser || isNaN(amount) || amount <= 0) {
            return message.reply('Please mention a valid user and amount.');
        }

        if (!cowoncyData[userId] || cowoncyData[userId].balance < amount) {
            return message.reply('You do not have enough cowoncy.');
        }

        if (!cowoncyData[targetUser.id]) {
            cowoncyData[targetUser.id] = { balance: 0 };
        }

        cowoncyData[userId].balance -= amount;
        cowoncyData[targetUser.id].balance += amount;

        fs.writeFileSync('./data/cowoncy.json', JSON.stringify(cowoncyData, null, 2));

        const embed = new MessageEmbed()
            .setColor('#ff9900')
            .setTitle('Cowoncy Transfer')
            .setDescription(`You have given ${amount} cowoncy 🐮 to ${targetUser.username}`);

        message.channel.send({ embeds: [embed] });
    },
};
