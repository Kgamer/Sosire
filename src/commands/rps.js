const { isMessageInstance } = require("@sapphire/discord.js-utilities");
const { Command } = require("@sapphire/framework");
const { Subcommand } = require("@sapphire/plugin-subcommands");

class RpsCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("rps")
        .setDescription("A game of Rock Paper Scissors!")
        .addStringOption((option) =>
          option
            .setName("move")
            .setDescription("Make your move")
            .setRequired(true)
            .addChoices(
              { name: "Rock", value: "rock" },
              { name: "Paper", value: "paper" },
              {name: 'Scissors', value: 'scissors'}
            )
        )
    );
  }
  async chatInputRun(interaction) {
    const uc = interaction.options.getString("move", true);
    const choice = ["rock", "paper", "scissors"];
    var randomNumber = Math.floor(Math.random() * choice.length);
    var bc = choice[randomNumber]

    if (uc === bc) {interaction.reply(`You and I both picked ${uc}. It's a tie!`)} else {
      switch (uc) {
        case 'rock':
            if (bc === 'paper') {interaction.reply(`You went for **${uc}**, I went for **${bc}**. I won!`)} else {interaction.reply(`You went for **${uc}**, I went for **${bc}**. You won!`)}
            break;

        case 'paper':
            if (bc === 'scissors') {interaction.reply(`You went for **${uc}**, I went for **${bc}**. I won!`)} else {interaction.reply(`You went for **${uc}**, I went for **${bc}**. You won!`)}
            break;

        case 'scissors':
            if (bc === 'rock') {interaction.reply(`You went for **${uc}**, I went for **${bc}**. I won!`)} else {interaction.reply(`You went for **${uc}**, I went for **${bc}**. You won!`)}
            break;

        default:
            break;
      }
    }

    
  }
}

module.exports = {
  RpsCommand,
};
