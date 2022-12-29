const { isMessageInstance } = require("@sapphire/discord.js-utilities");
const { Command } = require("@sapphire/framework");
const { Subcommand } = require("@sapphire/plugin-subcommands");

class PurgeCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("purge")
        .setDescription("Purge an amount of messages")
        .addIntegerOption((option) =>
          option
            .setName("number")
            .setDescription("Number of messages to delete")
            .setRequired(true)
        )
    );
  }
  async chatInputRun(interaction) {
    const num = interaction.options.getInteger("number", true);
    interaction.channel.bulkDelete(num);
    let msg = await interaction.reply({
      content: `Deleted **${num}** message(s)`,
      ephemeral: true,
    });
  }
}

module.exports = {
  PurgeCommand,
};
