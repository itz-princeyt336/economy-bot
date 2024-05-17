const { MessageEmbed } = require('discord.js');
const userData = require('../data/users.json');

module.exports = {
    name: 'inv',
    description: 'Displays the items in your inventory',
    execute(message, args) {
        const userId = message.author.id;
        const userInventory = userData[userId] ? userData[userId].inventory : [];

        if (userInventory.length === 0) {
            return message.reply('Your inventory is empty.');
        }

        const embed = new MessageEmbed()
            .setColor('#00ff00')
            .setTitle('Your Inventory')
            .setDescription('Here are the items in your inventory:')
            .addFields(
                userInventory.map(item => ({ name: item.name, value: `Quantity: ${item.quantity}`, inline: true }))
            );

        message.channel.send({ embeds: [embed] });
    },
};
