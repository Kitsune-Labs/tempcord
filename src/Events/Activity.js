// eslint-disable-next-line no-unused-vars
const { Client } = require("discord.js");

module.exports = {
	/**
     * @param {Client} client
     */
	execute: async (client) => {
		const Status = [
			{ "activities": [{ "name": "Hello World!" }] },
			{ "activities": [{ "name": "/ping" }] }
		];

		function switchActivity() {
			client.user.setPresence(Status[Math.floor(Math.random() * Status.length)]);
		}

		switchActivity();

		setInterval(switchActivity, 3600000); // Will change every hour
	}
};
