const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const userData = require('../data/users.json');
const animals = require('../data/animals.json');

module.exports = {
    name: 'hunt',
    description: 'Hunt for animals to add to your zoo',
    execute(message, args) {
        const userId = message.author.id;
        const randomAnimal = animals[Math.floor(Math.random() * animals.length)];

        if (!userData[userId]) {
            userData[userId] = { cowoncy: 0, zoo: [], inventory: [] };
        }

        const userZoo = userData[userId].zoo;
        const animalInZoo = userZoo.find(animal => animal.name === randomAnimal.name);

        if (animalInZoo) {
            animalInZoo.quantity += 1;
        } else {
            userZoo.push({ name: randomAnimal.name, quantity: 1 });
        }

        fs.writeFileSync('./data/users.json', JSON.stringify(userData, null, 2));

        const embed = new MessageEmbed()
            .setColor('#ff9900')
            .setTitle('Hunt Successful')
            .setDescription(`You have successfully hunted a ${randomAnimal.name} 🐾`);

        message.channel.send({ embeds: [embed] });
    },
};
