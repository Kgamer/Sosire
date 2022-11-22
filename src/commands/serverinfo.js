const { isMessageInstance } = require("@sapphire/discord.js-utilities");
const { Command } = require("@sapphire/framework");
const { Subcommand } = require("@sapphire/plugin-subcommands");
const { MessageEmbed } = require("discord.js");

class ServerinfoCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("serverinfo")
        .setDescription("Give you informations about a server")
    );
  }
  //send a first reply
  async chatInputRun(interaction) {
    const gld = interaction.guild;
    const members = gld.members.cache.filter((member) => !member.user.bot);
    const bots = gld.members.cache.filter((member) => member.user.bot);

    const embe = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`"${gld.name}" info`)
      .setURL(`${gld.iconURL()}`)
      .setThumbnail(`${gld.iconURL()}`)
      .setDescription(`${gld.members.cache.get(gld.ownerId).user.tag}'s server`)
      .addFields(
        {
          name: "Server name:",
          value: `${gld.name}`,
          inline: true,
        },
        {
          name: "Server ID:",
          value: `${gld.id}`,
          inline: true,
        },
        {
          name: "\u200b",
          value: "\u200b",
        },
        {
          name: "Member count:",
          value: `${members.size}`,
          inline: true,
        },
        {
          name: "Bot count:",
          value: `${bots.size}`,
          inline: true,
        },
        {
          name: "Role count:",
          value: `${gld.roles.cache.size}`,
          inline: true,
        }
      );

    const msg = await interaction.reply({ embeds: [embe] });
  }
}

module.exports = {
  ServerinfoCommand,
};
