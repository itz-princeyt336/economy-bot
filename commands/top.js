const { MessageEmbed } = require('discord.js');
const userData = require('../data/users.json');

module.exports = {
    name: 'top',
    description: 'Displays the top users with the highest cowoncy balances',
    execute(message, args) {
        const topUsers = Object.entries(userData)
            .sort((a, b) => b[1].cowoncy - a[1].cowoncy)
            .slice(0, 10);

        const embed = new MessageEmbed()
            .setColor('#ffcc00')
            .setTitle('Top Users')
            .setDescription('Here are the top users with the highest cowoncy balances:')
            .addFields(
                topUsers.map(([userId, data], index) => ({
                    name: `#${index + 1} ${message.guild.members.cache.get(userId).displayName}`,
                    value: `${data.cowoncy} cowoncy 🐮`,
                    inline: true
                }))
            );

        message.channel.send({ embeds: [embed] });
    },
};
