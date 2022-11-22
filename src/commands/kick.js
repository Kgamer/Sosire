const { isMessageInstance } = require("@sapphire/discord.js-utilities");
const { Command } = require("@sapphire/framework");
const { Subcommand } = require("@sapphire/plugin-subcommands");
const { Permissions } = require('discord.js')

class KickCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("kick")
        .setDescription("Kick an user")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("User to kick")
            .setRequired(true)
        )
    );
  }
  async chatInputRun(interaction) {
    if (interaction.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
        if (interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            const argument = interaction.options.getMember("user");
      
            argument.kick();
            interaction.reply(`Kicked **${argument.user.tag}**`)
          } else {
              interaction.reply('You dont have the permission dum dum >:c')
          }
    } else {
        interaction.reply("I no have permission")
    }
  }
}

module.exports = {
  KickCommand,
};
