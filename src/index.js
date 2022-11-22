const { SapphireClient } = require('@sapphire/framework');

const config = require('./config.json');

const client = new SapphireClient({ 
    intents: ['GUILDS', 'GUILD_MESSAGES', 'MESSAGE_CONTENT', 'GUILDS', 'GUILD_MEMBERS', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING', 'GUILD_BANS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_INTEGRATIONS', 'GUILD_INVITES', 'GUILD_PRESENCES', 'MESSAGE_CONTENT'], 
    defaultPrefix: '!', 
    loadMessageCommandListeners: true,
});

client.on('ready', () => {
    console.log('I\'m up!!')
})

client.login(config.TOKEN);
