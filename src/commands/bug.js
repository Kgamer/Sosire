const { isMessageInstance } = require("@sapphire/discord.js-utilities");
const { Command } = require("@sapphire/framework");
const { Subcommand } = require("@sapphire/plugin-subcommands");
const { MessageEmbed } = require("discord.js");

class BugCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("bug")
        .setDescription("Report a bug to the bot developers")
        .addStringOption((option) =>
          option
            .setName("bug")
            .setDescription("Please describe the bug")
            .setRequired(true)
        )
    );
  }
  async chatInputRun(interaction) {
    const argument = interaction.options.getString("bug", true);
    const embed = new MessageEmbed()
      .setTitle(`${interaction.user.tag}`)
      .addFields(
        { name: "Problem:", value: `${argument}`, inline: true },
        { name: "ID", value: `${interaction.user.id}`, inline: true }
      )
      .setTimestamp();
    interaction.reply({
      content:
        "Thank you for your bug submittion, we will get in touch with you ASAP if needed.",
      ephemeral: true,
    });
    const channel = await this.container.client.channels.fetch(
      "1041586269051953152"
    );
    channel.send({ embeds: [embed] });
  }
}

module.exports = {
  BugCommand,
};
