const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const cowoncyData = require('../data/cowoncy.json');
const shopItems = require('../data/shop.json');

module.exports = {
    name: 'buy',
    description: 'Buy an item from the shop',
    execute(message, args) {
        const userId = message.author.id;
        const itemName = args.join(' ').toLowerCase();

        const item = shopItems.find(i => i.name.toLowerCase() === itemName);

        if (!item) {
            return message.reply('Item not found in the shop.');
        }

        if (!cowoncyData[userId] || cowoncyData[userId].balance < item.price) {
            return message.reply('You do not have enough cowoncy to buy this item.');
        }

        cowoncyData[userId].balance -= item.price;

        fs.writeFileSync('./data/cowoncy.json', JSON.stringify(cowoncyData, null, 2));

        const embed = new MessageEmbed()
            .setColor('#ff9900')
            .setTitle('Purchase Successful')
            .setDescription(`You have purchased ${item.name} for ${item.price} cowoncy 🐮`);

        message.channel.send({ embeds: [embed] });
    },
};
