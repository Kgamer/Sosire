const { isMessageInstance } = require("@sapphire/discord.js-utilities");
const { Command } = require("@sapphire/framework");
const { Subcommand } = require("@sapphire/plugin-subcommands");

class BallCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("8ball")
        .setDescription("Let the ball decide your faith")
        .addStringOption((option) =>
          option
            .setName("question")
            .setDescription("Ask the ball any yes/no question.")
            .setRequired(true)
        )
    );
  }
  async chatInputRun(interaction) {
    const argument = interaction.options.getString("question", true);
    var textArray = [
      "Yes.",
      "No.",
      "Maybe",
      "Possibly",
      "Definitely",
      "100%",
      "Absolutely not",
      "**NO**",
    ];
    var randomNumber = Math.floor(Math.random() * textArray.length);
    await interaction.reply(
      `You asked: "${argument}" 8ball said: "${textArray[randomNumber]}"`
    );
  }
}

module.exports = {
  BallCommand,
};
