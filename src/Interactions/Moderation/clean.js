// eslint-disable-next-line no-unused-vars
const { Client, Interaction } = require("discord.js");

module.exports = {
	name: "clean",
	desc: "clean",
	options: [
		{
			name: "amount",
			description: "The amount of messages to delete",
			required: true,
			type: "NUMBER",
			minValue: 1,
			maxValue: 100
		}
	],
	/**
     * @param {Client} client
     * @param {Interaction} interaction
     */
	// eslint-disable-next-line no-unused-vars
	start: async (client, interaction, GuildData, AccountData) => {
		if (!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({
			content: "You do not have permission to clean channel messages!",
			ephemeral: true
		});

		if (!interaction.guild.me.permissions.has("MANAGE_MESSAGES")) return interaction.reply({
			content: "I cant manage messages! Please contact a guild Administrator for help.",
			ephemeral: true
		});

		const amount = interaction.options.getNumber("amount");

		interaction.channel.bulkDelete(amount).then((data) => {
			interaction.reply({
				content: data.size > 1 ? `I have removed ${data.size} messages` : `I have removed ${data.size} message`
			}).then(()=>{
				setTimeout(() => {
					interaction.deleteReply();
				}, 5000);
			});
		}).catch(error => {
			interaction.reply({
				content: `There was an error!\n\n__${error}__`,
				ephemeral: true
			});
		});
	}
};