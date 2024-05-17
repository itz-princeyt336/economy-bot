const { MessageEmbed } = require('discord.js');
const shopItems = require('../data/shop.json');

module.exports = {
    name: 'shop',
    description: 'View items available in the shop',
    execute(message, args) {
        const embed = new MessageEmbed()
            .setColor('#ff9900')
            .setTitle('Shop Items')
            .setDescription('Here are the items available for purchase:')
            .addFields(
                shopItems.map(item => ({
                    name: item.name,
                    value: `${item.description}\nPrice: ${item.price} cowoncy 🐮`
                }))
            );

        message.channel.send({ embeds: [embed] });
    },
};
