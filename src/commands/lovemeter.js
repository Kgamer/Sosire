const { isMessageInstance } = require("@sapphire/discord.js-utilities");
const { Command } = require("@sapphire/framework");
const { Subcommand } = require("@sapphire/plugin-subcommands");
const { MessageEmbed } = require("discord.js");

class LovemeterCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("lovemeter")
        .setDescription("Decides whether you guys should break up or not")
        .addUserOption((option) =>
          option
            .setName("user1")
            .setDescription("Mention user")
            .setRequired(true)
        )
        .addUserOption((option) =>
          option
            .setName("user2")
            .setDescription("Mention user")
            .setRequired(true)
        )
    );
  }
  async chatInputRun(interaction) {
    const user1 = interaction.options.getMember("user1", true);
    const user2 = interaction.options.getMember("user2", true);

    if (user1 === user2) {
      return interaction.reply("You love yourself a lot... I think");
    }

    const love = Math.random() * 100;
    const loveIndex = Math.floor(love / 10);
    const loveLevel = "❤️".repeat(loveIndex) + "♡".repeat(10 - loveIndex);

    if (
      (user1.user.id === "796425327647260718") &
      (user2.user.id === "626754022673481728")
    ) {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setColor("BLURPLE")
            .addFields({
              name: `${user1.displayName} and ${user2.displayName}`,
              value: `100%: \`${"❤️".repeat(10)}\``,
              inline: true,
            }),
        ],
      });
    } else if (
      (user2.user.id === "796425327647260718") &
      (user1.user.id === "626754022673481728")
    ) {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setColor("BLURPLE")
            .addFields({
              name: `${user1.displayName} and ${user2.displayName}`,
              value: `100%: \`${"❤️".repeat(10)}\``,
              inline: true,
            }),
        ],
      });
    } else {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setColor("BLURPLE")
            .addField(
              `${user1.displayName} and ${user2.displayName}`,
              `${Math.floor(love)}%: \`${loveLevel}\``,
              true
            ),
        ],
      });
    }
  }
}

module.exports = {
  LovemeterCommand,
};
