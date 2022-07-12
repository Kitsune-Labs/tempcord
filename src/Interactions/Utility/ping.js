// eslint-disable-next-line no-unused-vars
const { Client, CommandInteraction } = require("discord.js");

module.exports = {
	name: "ping",
	desc: "Pong!",
	/**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
	// eslint-disable-next-line no-unused-vars
	start: async (client, interaction) => {
		interaction.reply({
			content: `Pong! ${client.ws.ping}ms`
		});
	}
};