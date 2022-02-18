const { SlashCommandBuilder } = require('@discordjs/builders');
const { audio, client } = require("../../index");
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

const name = "volume";
const description = "Change the volume of the playing song for everyone";

module.exports = {
    name,
    description,
    builder: new SlashCommandBuilder().setName(name).setDescription(description),
    slashCommand(interaction, args) {
        const channel = client.channels.cache.get(interaction.channelId);
        execute(args, channel, interaction.member).then((response, err) => {
            if (err) return console.error(err);

            interaction.editReply(response);
        });
    },
    messageCommand(message, args) {
        execute(args, message.channel, message.member).then((response, err) => {
            if (err) return console.error(err);

            message.channel.send(response);
        });
    }
}

async function execute(args, channel, member) {
    return audio.setVolume(args, channel);
}
