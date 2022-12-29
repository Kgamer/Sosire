const { isMessageInstance } = require("@sapphire/discord.js-utilities");
const { Command } = require("@sapphire/framework");
const { Subcommand } = require("@sapphire/plugin-subcommands");
const { Permissions, MessageEmbed } = require("discord.js");

class BanCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("ban")
        .setDescription("Ban an user")
        .addUserOption((option) =>
          option.setName("user").setDescription("Who to ban").setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("reason")
            .setDescription("The reason to ban this user")
            .setRequired(false)
        )
    );
  }
  async chatInputRun(interaction) {
    const target = interaction.options.getMember("user");
    const reason = interaction.options.getString("reason");

    const bannede = new MessageEmbed()
      .setTitle(`Banned ${target.tag}`)
      .addFields({ name: "Moderator:", value: `${interaction.user.tag}` });

    if (target === interaction.member) {
      return interaction.reply("Can't ban yerself ya dummy");
    } else if (
      !interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)
    ) {
      return interaction.reply(
        "I do not have the following permission to execute this command: BAN_MEMBERS"
      );
    } else if (
      !interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)
    ) {
      return interaction.reply(
        "You do not have the permission to use this command"
      );
    } else if (
      target.roles.highest.position >
      interaction.guild.me.roles.highest.position
    ) {
      interaction.reply("My role is bellow the targetted user's role.");
    } else {
      if (!reason) {
        target.ban();
        bannede.addFields({ name: "Reason:", value: `${reason}` });
        interaction.reply({ embeds: [bannede] });
      } else if (reason) {
        target.ban();
        interaction.reply({ embeds: [bannede] });
      }
    }
  }
}

module.exports = {
  BanCommand,
};
