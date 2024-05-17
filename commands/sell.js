const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const userData = require('../data/users.json');
const animals = require('../data/animals.json');

module.exports = {
    name: 'sell',
    description: 'Sell an animal from your zoo for cowoncy',
    execute(message, args) {
        const userId = message.author.id;
        const animalName = args.join(' ').toLowerCase();
        const animal = animals.find(a => a.name.toLowerCase() === animalName);

        if (!animal) {
            return message.reply('This animal does not exist.');
        }

        if (!userData[userId] || !userData[userId].zoo.some(a => a.name.toLowerCase() === animalName)) {
            return message.reply('You do not have this animal in your zoo.');
        }

        const userZoo = userData[userId].zoo;
        const animalInZoo = userZoo.find(a => a.name.toLowerCase() === animalName);

        if (animalInZoo.quantity > 1) {
            animalInZoo.quantity -= 1;
        } else {
            userData[userId].zoo = userZoo.filter(a => a.name.toLowerCase() !== animalName);
        }

        userData[userId].cowoncy += animal.value;

        fs.writeFileSync('./data/users.json', JSON.stringify(userData, null, 2));

        const embed = new MessageEmbed()
            .setColor('#ff9900')
            .setTitle('Animal Sold')
            .setDescription(`You have sold a ${animal.name} for ${animal.value} cowoncy 🐮`);

        message.channel.send({ embeds: [embed] });
    },
};
