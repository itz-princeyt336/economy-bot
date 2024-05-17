const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays a list of available commands',
    execute(message, args) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Command List')
            .setDescription('Here is the list of commands!\nFor more info on a specific command, use `!help {command}`')
            .addFields(
                { name: '🎖 Rankings', value: '`top` `my`', inline: true },
                { name: '💰 Economy', value: '`cowoncy` `give` `daily` `quest` `shop` `buy`', inline: true },
                { name: '🌱 Animals', value: '`zoo` `hunt` `sell` `inv` `autohunt`', inline: true },
                { name: '🎲 Gambling', value: '`slots` `coinflip` `lottery`', inline: true },
                { name: '🔧 Utility', value: '`ping` `link` `support` `prefix`', inline: true }
            )
            
        const supportButton = new MessageButton()
            .setStyle('LINK')
            .setLabel('Support Server')
            .setURL('https://discord.gg/txX9eyGPk7');

        const inviteButton = new MessageButton()
            .setStyle('LINK')
            .setLabel('Bot Invite')
            .setURL('https://discord.com/oauth2/authorize?client_id=1240605719145873409&scope=bot&permissions=8');

        const githubButton = new MessageButton()
            .setStyle('LINK')
            .setLabel('Youtube Channel')
            .setURL('https://youtube.com/@Im0Prince?sub_confirmation=1');

        const row = new MessageActionRow()
            .addComponents(supportButton, inviteButton, githubButton);

        message.channel.send({ embeds: [embed], components: [row] });
    },
};