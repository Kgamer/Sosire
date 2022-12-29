const { isMessageInstance } = require("@sapphire/discord.js-utilities");
const { Command } = require("@sapphire/framework");
const { Subcommand } = require("@sapphire/plugin-subcommands");

class GithubCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName("github").setDescription("The Github rep of the bot")
    );
  }
  //send a first reply
  async chatInputRun(interaction) {
    interaction.reply(
      "Bot's Github repository: https://github.com/Kgamer/Sosire"
    );
  }
}

module.exports = {
  GithubCommand,
};
