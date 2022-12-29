const { isMessageInstance } = require("@sapphire/discord.js-utilities");
const { Command } = require("@sapphire/framework");
const { Subcommand } = require("@sapphire/plugin-subcommands");

class UnbanCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("unban")
        .setDescription("Unban an user")
        .addStringOption((option) =>
          option
            .setName("userid")
            .setDescription("The ID of the user")
            .setRequired(true)
        )
    );
  }
  async chatInputRun(interaction) {
    const target = interaction.options.getString("userid", true);
    if (interaction.guild.me.permissions.has("BAN_MEMBERS")) {
      if (interaction.member.permissions.has("BAN_MEMBERS")) {
        const banList = await interaction.guild.bans.fetch();

        const userb = this.container.client.users.cache.get(target);

        interaction.guild.members.unban(target);
        interaction.reply(`Unbaned ${userb.tag}`);
      } else {
        return interaction.reply("You do not have the permission to do this");
      }
    } else {
      return interaction.reply(
        "I do not have the following permission: BAN_MEMBERS"
      );
    }
  }
}

module.exports = {
  UnbanCommand,
};
