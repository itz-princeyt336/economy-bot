const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const cowoncyData = require('../data/cowoncy.json');

const cooldowns = {};

module.exports = {
    name: 'daily',
    description: 'Claim your daily cowoncy',
    execute(message, args) {
        const userId = message.author.id;
        const dailyAmount = 100; // Amount of cowoncy given daily
        const cooldownTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        if (!cowoncyData[userId]) {
            cowoncyData[userId] = { balance: 0 };
        }

        const lastDailyTime = cooldowns[userId] || 0;
        const currentTime = Date.now();

        if (lastDailyTime && (currentTime - lastDailyTime < cooldownTime)) {
            const remainingTime = cooldownTime - (currentTime - lastDailyTime);
            const remainingHours = Math.floor(remainingTime / (60 * 60 * 1000));
            const remainingMinutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));

            return message.reply(`You can claim your daily cowoncy again in ${remainingHours} hours and ${remainingMinutes} minutes.`);
        }

        cowoncyData[userId].balance += dailyAmount;
        cooldowns[userId] = currentTime;

        fs.writeFileSync('./data/cowoncy.json', JSON.stringify(cowoncyData, null, 2));

        const embed = new MessageEmbed()
            .setColor('#ff9900')
            .setTitle('Daily Cowoncy')
            .setDescription(`You have received your daily ${dailyAmount} cowoncy 🐮`);

        message.channel.send({ embeds: [embed] });
    },
};