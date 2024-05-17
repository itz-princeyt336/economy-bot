const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'link',
    description: 'Get the invite link for the bot',
    execute(message, args) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Bot Invite Link')
            .setDescription('Click [here](https://discord.com/oauth2/authorize?client_id=1240605719145873409&scope=bot&permissions=8) to invite the bot to your server.');

        message.channel.send({ embeds: [embed] });
    },
};
