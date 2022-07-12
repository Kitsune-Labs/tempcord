// eslint-disable-next-line no-unused-vars
const { Client, CommandInteraction } = require("discord.js");

module.exports = {
	name: "slowmode",
	desc: "Change the slowmode of a channel",
	options: [
		{
			name: "set",
			description: "Set the slowmode",
			type: 1,
			options: [
				{
					name: "seconds",
					description: "How long should the slowmode be in seconds",
					required: true,
					type: "NUMBER",
					minValue: 1,
					maxValue: 21600
				}
			]
		},
		{
			name: "remove",
			description: "Remove this channel's slowmode",
			type: 1
		}
	],
	/**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
	// eslint-disable-next-line no-unused-vars
	start: async (client, interaction) => {
		const time = interaction.options.getNumber("seconds");

		if (!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.reply({
			content: "You do not have permisssion to manage channels!",
			ephemeral: true
		});

		if (!interaction.guild.me.permissions.has("MANAGE_CHANNELS")) return interaction.followUp({
			content: "I am unable to manage channels! Please contact a guild Administrator for help.",
			ephemeral: true
		});

		switch (interaction.options.getSubcommand()) {
		case "set":
			interaction.channel.setRateLimitPerUser(time).then(() => {
				interaction.reply({
					content: `Slowmode has been updated to ${time} seconds!`,
					ephemeral: true
				});
			});
			break;
		case "remove":
			interaction.channel.setRateLimitPerUser(0).then(() => {
				interaction.reply({
					content: "Channel slowmode has been removed!",
					ephemeral: true
				});
			});
			break;
		}
	}
};