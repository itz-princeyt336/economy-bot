const { MessageEmbed } = require('discord.js');
const userData = require('../data/users.json');
const fs = require('fs');

module.exports = {
    name: 'coinflip',
    description: 'Flip a coin for a chance to win cowoncy',
    execute(message, args) {
        const userId = message.author.id;
        const userCowoncy = userData[userId] ? userData[userId].cowoncy : 0;
        const betAmount = parseInt(args[0], 10) || 0;
        const side = args[1] ? args[1].toLowerCase() : '';

        if (betAmount <= 0 || isNaN(betAmount)) {
            return message.reply('Please specify a valid bet amount.');
        }

        if (betAmount > userCowoncy) {
            return message.reply('You do not have enough cowoncy.');
        }

        if (side !== 'heads' && side !== 'tails') {
            return message.reply('Please specify either heads or tails.');
        }

        const result = Math.random() < 0.5 ? 'heads' : 'tails';

        let description = `You flipped ${result}.`;

        if (result === side) {
            description += `\nYou won! 🎉 You earned ${betAmount} cowoncy.`;
            userData[userId].cowoncy += betAmount;
        } else {
            description += `\nYou lost. Better luck next time! 💸 You lost ${betAmount} cowoncy.`;
            userData[userId].cowoncy -= betAmount;
        }

        const embed = new MessageEmbed()
            .setColor('#ffcc00')
            .setTitle('Coinflip')
            .setDescription(description);

        fs.writeFileSync('./data/users.json', JSON.stringify(userData, null, 2));

        message.channel.send({ embeds: [embed] });
    },
};
