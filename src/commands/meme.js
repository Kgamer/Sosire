const { isMessageInstance } = require("@sapphire/discord.js-utilities");
const { Command } = require("@sapphire/framework");
const { Subcommand } = require("@sapphire/plugin-subcommands");
const fetch = require("node-fetch");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

class MemeCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName("meme").setDescription("haha funny memes")
    );
  }

  async chatInputRun(interaction) {
    const response = await fetch("https://reddit.com/r/dankmemes/random/.json");
    const body = await response.json();
    let meme = body[0].data.children[0].data;
    const row = new MessageActionRow() // Prettier
      .addComponents(
        new MessageButton() // Prettier
          .setStyle("LINK")
          .setURL(`https://reddit.com${meme.permalink}`)
          .setLabel("View meme")
      );
    const embed = new MessageEmbed() // Prettier
      .setColor("RANDOM")
      .setTitle(meme.title)
      .setURL(`https://reddit.com${meme.permalink}`)
      .setImage(meme.url)
      .setTimestamp()
      .setFooter({
        text: `👍 ${meme.ups} upvotes • 💬 ${meme.num_comments} comments • Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({
          dynamic: true,
          format: "png",
          size: 2048,
        }),
      });
    interaction.reply({ embeds: [embed], components: [row] });
  }
}

module.exports = {
  MemeCommand,
};
