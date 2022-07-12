// eslint-disable-next-line no-unused-vars
const { Client } = require("discord.js");

module.exports = {
	/**
     * @param {Client} client
     */
	execute: async (client) => {
		client.on("interactionCreate", async (interaction) => {
			if (!interaction.isCommand() || interaction.user.bot || interaction.replied || !interaction.guild) return;
			const InteractionCommand = client.SlashCommands.get(interaction.commandName);

			if (!InteractionCommand) return interaction.reply({
				content: `I can't seem to find ${interaction.commandName}...`
			});

			if (InteractionCommand.defer) {
				if (InteractionCommand.ephemeral && InteractionCommand.ephemeral === true) {
					await interaction.deferReply({ ephemeral: true });
				} else {
					await interaction.deferReply();
				}
			}

			InteractionCommand.start(client, interaction).catch(error => {
				const messageStruct = {
					content: "This command doesn't seem to have worked! Sorry about that...",
					ephemeral: true
				};

				if (interaction.deferred) {
					interaction.followUp(messageStruct);
				} else {
					interaction.reply(messageStruct);
				}

				console.log(error);
			});
		});
	}
};