const { isMessageInstance } = require("@sapphire/discord.js-utilities");
const { Command } = require("@sapphire/framework");
const { MessageEmbed } = require("discord.js");

class WhoCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("who")
        .setDescription("Give you basic infos about an user")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("User to look up")
            .setRequired(true)
        )
    );
  }
  async chatInputRun(interaction) {
    const usern = interaction.options.getUser("user", true);
    const emb = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${usern.username}'s Info`)
      .setURL(`${usern.avatarURL("dynamic", true)}`)
      .setThumbnail(`${usern.avatarURL("dynamic", true)}`)
      .addFields(
        {
          name: "User tag:",
          value: `${usern.tag}`,
          inline: true,
        },
        {
          name: "User ID:",
          value: `${usern.id}`,
          inline: true,
        },
        {
          name: "\u200b",
          value: "\u200b",
        },
        {
          name: "Created at:",
          value: `${usern.createdAt}`,
          inline: true,
        },
        {
          name: "Joined at:",
          value: `${interaction.member.joinedAt}`,
          inline: true,
        }
      );
    const msg = await interaction.reply({
      content: `${usern.username}`,
      embeds: [emb],
      fetchReply: true,
    });
  }
}

module.exports = {
  WhoCommand,
};
