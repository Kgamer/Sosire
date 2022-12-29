const { isMessageInstance } = require("@sapphire/discord.js-utilities");
const { Command } = require("@sapphire/framework");
const { Subcommand } = require("@sapphire/plugin-subcommands");
const { MessageEmbed } = require("discord.js");

class AboutCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName("about").setDescription("Basics about the bot")
    );
  }
  //send a first reply
  async chatInputRun(interaction) {

    const embed = new MessageEmbed()
      .setTitle("Sosire Bot Basic Informations")
      .setURL("https://discord.gg/anhCtrfS5X")
      .setThumbnail(this.container.client.user.avatarURL())
      .setDescription("Created by Soes (SoesDesu#7293)")
      .addFields(
        {
          name: "__**Creator Abouts**__",
          value:
            "Vietnamese bot developer Soes (14) started coding discord bots with Discord.js at 12.",
        },
        {
          name: "__**Bot About**__",
          value:
            `Bot created with [Sapphire Framework](https://www.sapphirejs.dev/) and [Discord.js](https://discord.js.org/#/) \u200b Inspired by a peanut I saw on my desk (I saw the peanut and I thought why not make a bot) \u200b *To get the commands list, type in **/** in chat and click on the bot' profile picture* `,
        },
        {
            name: 'The bot is currently working in:',
            value: `${this.container.client.guilds.cache.size} servers`
        },
        {
          name: "\u200b",
          value:
            "[Invite link](https://discord.com/api/oauth2/authorize?client_id=1043558775900086274&permissions=8&scope=bot%20applications.commands) / [Support the Creator](https://patreon.com/soesdesu)",
        }
      );

    interaction.reply({ embeds: [embed] });
  }
}

module.exports = {
  AboutCommand,
};
