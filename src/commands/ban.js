const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { Subcommand } = require('@sapphire/plugin-subcommands');
const { Permissions } = require('discord.js')

class BanCommand extends Command {
constructor(context, options) {
super(context, { ...options });
}

registerApplicationCommands(registry) {
registry.registerChatInputCommand((builder) =>
builder.setName('ban').setDescription('Ban an user').addUserOption((option) => 
option
.setName('user')
.setDescription('Who to ban')
.setRequired(true)
).addStringOption((option) => 
option
.setName('reason')
.setDescription('The reason to ban this user')
.setRequired(false)
)
);
}
async chatInputRun(interaction) {
    if (interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
        if (interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            const reason = interaction.options.getString('reason')
            if (!reason) {
                const argument = interaction.options.getMember('user')
                argument.ban()
                interaction.reply(`Banned **${argument.user.tag}**`)
            } else {
                const argument = interaction.options.getMember('user')
                argument.ban({reason: `${reason}`})
                interaction.reply(`Banned **${argument.user.tag}** for "${reason}"`)
            }
        }
    }
}
}

module.exports = {
BanCommand
};