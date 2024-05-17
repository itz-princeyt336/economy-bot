const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'prefix',
    description: 'Change the command prefix',
    execute(message, args) {
        const newPrefix = args[0];

        if (!newPrefix) {
            return message.reply('Please provide a new prefix.');
        }

        // Save new prefix to your data storage mechanism (e.g., JSON file)

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Prefix Changed')
            .setDescription(`Prefix has been changed to \`${newPrefix}\`.`);

        message.channel.send({ embeds: [embed] });
    },
};
