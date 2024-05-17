const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const cowoncyData = require('../data/cowoncy.json');

const cooldowns = {};

module.exports = {
    name: 'quest',
    description: 'Complete a quest to earn cowoncy',
    execute(message, args) {
        const userId = message.author.id;
        const questReward = 50; // Amount of cowoncy earned per quest
        const cooldownTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        if (!cowoncyData[userId]) {
            cowoncyData[userId] = { balance: 0 };
        }

        const lastQuestTime = cooldowns[userId] || 0;
        const currentTime = Date.now();

        if (lastQuestTime && (currentTime - lastQuestTime < cooldownTime)) {
            const remainingTime = cooldownTime - (currentTime - lastQuestTime);
            const remainingHours = Math.floor(remainingTime / (60 * 60 * 1000));
            const remainingMinutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));

            return message.reply(`You can complete another quest in ${remainingHours} hours and ${remainingMinutes} minutes.`);
        }

        cowoncyData[userId].balance += questReward;
        cooldowns[userId] = currentTime;

        fs.writeFileSync('./data/cowoncy.json', JSON.stringify(cowoncyData, null, 2));

        const embed = new MessageEmbed()
            .setColor('#ff9900')
            .setTitle('Quest Completed')
            .setDescription(`You have completed a quest and earned ${questReward} cowoncy 🐮`);

        message.channel.send({ embeds: [embed] });
    },
};