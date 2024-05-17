const { MessageEmbed } = require('discord.js');
const userData = require('../data/users.json');
const fs = require('fs');

module.exports = {
    name: 'lottery',
    description: 'Enter the lottery for a chance to win cowoncy',
    execute(message, args) {
        const userId = message.author.id;
        const userCowoncy = userData[userId] ? userData[userId].cowoncy : 0;
        const tickets = parseInt(args[0], 10) || 1;
        const ticketPrice = 100;

        const totalCost = tickets * ticketPrice;

        if (tickets <= 0 || isNaN(tickets)) {
            return message.reply('Please specify a valid number of tickets to purchase.');
        }

        if (totalCost > userCowoncy) {
            return message.reply('You do not have enough cowoncy to purchase these tickets.');
        }

        userData[userId].cowoncy -= totalCost;

        const winners = Math.floor(Math.random() * tickets) + 1;

        if (winners === 1) {
            const winnings = totalCost * tickets * 2;

            userData[userId].cowoncy += winnings;

            const embed = new MessageEmbed()
                .setColor('#ffcc00')
                .setTitle('Lottery Results')
                .setDescription(`Congratulations! You won the lottery and received ${winnings} cowoncy! 🎉`);

            fs.writeFileSync('./data/users.json', JSON.stringify(userData, null, 2));

            return message.channel.send({ embeds: [embed] });
        }

        const embed = new MessageEmbed()
            .setColor('#ffcc00')
            .setTitle('Lottery Results')
            .setDescription('Better luck next time!');

        fs.writeFileSync('./data/users.json', JSON.stringify(userData, null, 2));

        message.channel.send({ embeds: [embed] });
    },
};
