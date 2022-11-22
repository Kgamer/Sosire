const { isMessageInstance } = require("@sapphire/discord.js-utilities");
const { Command } = require("@sapphire/framework");
const { Subcommand } = require("@sapphire/plugin-subcommands");

class SayCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("say")
        .setDescription("Make that bot say something for you")
        .addStringOption((option) =>
          option
            .setName("thing")
            .setDescription("Whatever you want the bot to say")
            .setRequired(true)
        )
    );
  }
  async chatInputRun(interaction) {
    const argument = interaction.options.getString("thing", true);
    const msg = await interaction.channel.send({
      content: `${argument}`,
      ephemeral: true,
      fetchReply: true,
    });
  }
}

module.exports = {
  SayCommand,
};
