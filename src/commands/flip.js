const { isMessageInstance } = require("@sapphire/discord.js-utilities");
const { Command } = require("@sapphire/framework");
const { Subcommand } = require("@sapphire/plugin-subcommands");

class FlipCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("flip")
        .setDescription("Flip a coin")
        .addStringOption((option) =>
          option
            .setName("side")
            .setDescription("Choose which side of the coin you want")
            .setRequired(true)
            .addChoices(
              { name: "Head", value: "head" },
              { name: "Tail", value: "tail" }
            )
        )
    );
  }
  async chatInputRun(interaction) {
    const argument = interaction.options.getString("side", true);
    const torh = ["tail", "head"];
    var randomNumber = Math.floor(Math.random() * torh.length);

    interaction.reply(
      `<@${interaction.user.id}>, you chose **${argument}**. You got **${torh[randomNumber]}**`
    );
  }
}

module.exports = {
  FlipCommand,
};
