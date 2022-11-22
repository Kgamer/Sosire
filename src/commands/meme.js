const { isMessageInstance } = require("@sapphire/discord.js-utilities");
const { Command } = require("@sapphire/framework");
const { Subcommand } = require("@sapphire/plugin-subcommands");
const fetch = require('node-fetch');
const { MessageEmbed } = require("discord.js");

class MemeCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName("meme").setDescription("haha funny memes")
    );
  }
  //send a first reply
  async chatInputRun(interaction) {
    let meme = await fetch('https://meme-api.herokuapp.com/gimme').then(r => r.json());
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setTitle(meme.title)
          .setURL(meme.postLink)
          .setImage(meme.url)
          .setColor('BLURPLE')
          .setFooter({ text: `${meme.ups}👍 || r/${meme.subreddit}` })
      ]
    })
  }
}

module.exports = {
  MemeCommand,
};
