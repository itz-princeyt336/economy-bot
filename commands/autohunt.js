const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const userData = require('../data/users.json');
const animals = require('../data/animals.json');

const cooldowns = {};

module.exports = {
    name: 'autohunt',
    description: 'Automatically hunt for animals',
    async execute(message, args) {
        const userId = message.author.id;
        const duration = parseInt(args[0], 10) || 1; // Duration in minutes
        const interval = 5000; // Interval in milliseconds (5 seconds)
        const huntCost = 10; // Cost for each hunting attempt
        const cooldownTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        if (!userData[userId]) {
            userData[userId] = { cowoncy: 0, zoo: [], inventory: [] };
        }

        const lastHuntTime = cooldowns[userId] || 0;
        const currentTime = Date.now();

        if (lastHuntTime && (currentTime - lastHuntTime < cooldownTime)) {
            const remainingTime = cooldownTime - (currentTime - lastHuntTime);
            const remainingHours = Math.floor(remainingTime / (60 * 60 * 1000));
            const remainingMinutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));

            return message.reply(`You can start another auto hunt in ${remainingHours} hours and ${remainingMinutes} minutes.`);
        }

        const huntCostTotal = duration * (60 / (interval / 1000)) * huntCost;

        if (userData[userId].cowoncy < huntCostTotal) {
            return message.reply(`You do not have enough cowoncy to start an auto hunt for ${duration} minutes. You need at least ${huntCostTotal} cowoncy.`);
        }

        userData[userId].cowoncy -= huntCostTotal;
        cooldowns[userId] = currentTime;

        const endTime = currentTime + duration * 60 * 1000;

        const hunt = async () => {
            if (Date.now() > endTime) {
                const embed = new MessageEmbed()
                    .setColor('#ff9900')
                    .setTitle('Auto Hunt Completed')
                    .setDescription(`Auto hunt completed. Check your zoo to see the new animals.`);

                fs.writeFileSync('./data/users.json', JSON.stringify(userData, null, 2));

                return message.channel.send({ embeds: [embed] });
            }

            const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
            const userZoo = userData[userId].zoo;
            const animalInZoo = userZoo.find(animal => animal.name === randomAnimal.name);

            if (animalInZoo) {
                animalInZoo.quantity += 1;
            } else {
                userZoo.push({ name: randomAnimal.name, quantity: 1 });
            }

            setTimeout(hunt, interval);
        };

        const embed = new MessageEmbed()
            .setColor('#ff9900')
            .setTitle('Auto Hunt Started')
            .setDescription(`Auto hunt started for ${duration} minutes. You will hunt an animal every 5 seconds.\nCost: ${huntCostTotal} cowoncy`);

        message.channel.send({ embeds: [embed] });

        hunt();
    },
};