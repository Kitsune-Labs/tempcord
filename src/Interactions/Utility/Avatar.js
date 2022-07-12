// eslint-disable-next-line no-unused-vars
const { CommandInteraction, Client } = require("discord.js");

module.exports = {
	name: "avatar",
	desc: "View someone's avatar",
	options: [
		{
			name: "user",
			description: "User",
			type: "USER",
			required: false
		}
	],
	/**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
	start: async (client, interaction) => {
		const guildMember = interaction.options.getMember("user") || interaction.member;
		const AvatarURL = guildMember.displayAvatarURL({ dynamic: true, size: 2048 });

		interaction.reply({
			embeds: [
				{
					description: `${guildMember.user.tag}'s avatar`,
					image: {
						url: guildMember.displayAvatarURL({ dynamic: true, size: 2048 })
					},
					color: "#fc844c"
				}
			],
			components: [
				{
					type: "ACTION_ROW",
					components: [
						{ type: 2, label: "Avatar", style: 5, url: AvatarURL }
					]
				}
			]
		});
	}
};