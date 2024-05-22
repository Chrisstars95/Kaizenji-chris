const axios = require('axios');

module.exports = {
	config: {
		name: "blueai",
		author: "Cliff",
    aliases: ["blue"],
		version: "2.0",
		cooldowns: 5,
		role: 0,
		shortDescription: {
			en: "ai cmd powered by blueai"
		},
		category: "ai",
		guide: {
			en: "blueai [your content]"
		}
	},

	onStart: async function ({ api, event, args }) {
		const content = encodeURIComponent(args.join(" "));

		if (!content) {
			return api.sendMessage("Please Provide your question with blue AI 🔵", event.threadID, event.messageID);
		}

		api.sendMessage("Blue AI is typing...", event.threadID, event.messageID);

		const apiUrl = `https://bluerepoapislasttry.onrender.com/hercai?content=${content}`;

		try {
			const response = await axios.get(apiUrl);
			const reply = response.data.reply;

			api.sendMessage(reply, event.threadID, event.messageID);
		} catch (error) {
			console.error("Error fetching data:", error.message);
			console.error("Error details:", error.response ? error.response.data : error.message);
			api.sendMessage("An error occurred while processing your request. Check the server logs for more details.", event.threadID);
		}
	}
};
