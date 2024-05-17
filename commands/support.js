const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'support',
    description: 'Get the support server link',
    execute(message, args) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Support Server')
            .setDescription('Join our support server [here](https://discord.gg/txX9eyGPk7).');

        message.channel.send({ embeds: [embed] });
    },
};
