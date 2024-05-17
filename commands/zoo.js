const { MessageEmbed } = require('discord.js');
const userData = require('../data/users.json');

module.exports = {
    name: 'zoo',
    description: 'Displays the animals in your zoo',
    execute(message, args) {
        const userId = message.author.id;
        const userZoo = userData[userId] ? userData[userId].zoo : [];

        if (userZoo.length === 0) {
            return message.reply('Your zoo is empty.');
        }

        const embed = new MessageEmbed()
            .setColor('#00ff00')
            .setTitle('Your Zoo')
            .setDescription('Here are the animals in your zoo:')
            .addFields(
                userZoo.map(animal => ({ name: animal.name, value: `Quantity: ${animal.quantity}`, inline: true }))
            );

        message.channel.send({ embeds: [embed] });
    },
};
