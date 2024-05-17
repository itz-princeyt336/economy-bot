const { MessageEmbed } = require('discord.js');
const userData = require('../data/users.json');
const fs = require('fs');

module.exports = {
    name: 'slots',
    description: 'Play a game of slots',
    execute(message, args) {
        const userId = message.author.id;
        const userCowoncy = userData[userId] ? userData[userId].cowoncy : 0;
        const betAmount = parseInt(args[0], 10) || 0;
        const emojis = ['🍒', '🍊', '🍋', '🍇', '🍉'];

        if (betAmount <= 0 || isNaN(betAmount)) {
            return message.reply('Please specify a valid bet amount.');
        }

        if (betAmount > userCowoncy) {
            return message.reply('You do not have enough cowoncy.');
        }

        const slot1 = emojis[Math.floor(Math.random() * emojis.length)];
        const slot2 = emojis[Math.floor(Math.random() * emojis.length)];
        const slot3 = emojis[Math.floor(Math.random() * emojis.length)];

        let description = `[${slot1}] [${slot2}] [${slot3}]`;

        if (slot1 === slot2 && slot2 === slot3) {
            description += `\nYou won the jackpot! 💰💰💰 You earned ${betAmount * 10} cowoncy.`;
            userData[userId].cowoncy += betAmount * 10;
        } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
            description += `\nYou won! 🎉 You earned ${betAmount * 2} cowoncy.`;
            userData[userId].cowoncy += betAmount * 2;
        } else {
            description += `\nYou lost. Better luck next time! 💸 You lost ${betAmount} cowoncy.`;
            userData[userId].cowoncy -= betAmount;
        }

        const embed = new MessageEmbed()
            .setColor('#ffcc00')
            .setTitle('Slots')
            .setDescription(description);

        fs.writeFileSync('./data/users.json', JSON.stringify(userData, null, 2));

        message.channel.send({ embeds: [embed] });
    },
};
