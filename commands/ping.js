const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Ping pong!',
    execute(message, args) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Pong! 🏓')
            .setDescription(`Latency is ${Date.now() - message.createdTimestamp}ms.`);

        message.channel.send({ embeds: [embed] });
    },
};
