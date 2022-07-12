require("dotenv/config");

const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const client = new Client({
	intents: ["GUILDS", "GUILD_MEMBERS"],

	allowedMentions: {
		parse: ["users", "roles"],
		repliedUser: false
	}
});

client.login(process.env.TOKEN);
client.SlashCommands = new Collection();

process.on("unhandledRejection", async (reason) => {
	console.log(reason);
});

client.once("ready", async () => {
	console.log("Started\n");

	const commands = client.guilds.cache.get("777251087592718336").commands;
	if (process.env.NIGHTLY === "true") commands = client.guilds.cache.get("777251087592718336").commands;

	for (let file of readdirSync("./src/Events/").filter(file => file.endsWith(".js"))) {
		require(`./Events/${file}`).execute(client);
	}

	readdirSync("./src/Interactions/").forEach(async Folder => {
		const Interactions = readdirSync(`./src/Interactions/${Folder}/`).filter(f =>f .endsWith(".js"));

		for (let interact of Interactions) {
			let pull = require(`./Interactions/${Folder}/${interact}`);

			client.SlashCommands.set(`${pull.name}`, pull);
		}
	});

	const commandsToSet = [];

	for (var cmd of client.SlashCommands) {
		const commandStruct = {
			name: `${cmd[0]}`,
			description: `${cmd[1].desc}`,
			dm_permission: false // Makes slash commands not work in DM's
		};

		if (cmd[1].options) commandStruct.options = cmd[1].options;
		if (!commandsToSet.includes(cmd[0])) commandsToSet.push(commandStruct);
	}

	await commands.set(commandsToSet);
});
