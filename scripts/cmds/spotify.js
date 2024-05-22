const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "spotify",
    version: "1.0.0",
    role: 0,
    author: "Jonell Magallanes",
    shortDescription: "Search and play music from Spotify", //api by jonell Magallanes cc project
    countDown: 10,
    category: "media",
    guide: {
      en: '[song name]'
    }
  },

  onStart: async function ({ api, event, args }) {
    const listensearch = encodeURIComponent(args.join(" "));
    const apiUrl = `https://jonellccapisproject-e1a0d0d91186.herokuapp.com/api/spotify?search=${listensearch}`;

    if (!listensearch) return api.sendMessage("Please provide the name of the song you want to search.", event.threadID, event.messageID);

    try {
      api.sendMessage("🎵 | Searching for your music on Spotify. Please wait...", event.threadID, event.messageID);

      const response = await axios.get(apiUrl);
      const { platform, status, data } = response.data;

      if (status && platform === "Spotify") {
        const { title, audio } = data;

        const filePath = path.join(__dirname, 'cache', `${Date.now()}.mp3`);
        const writeStream = fs.createWriteStream(filePath);

        const audioResponse = await axios.get(audio, { responseType: 'stream' });
        audioResponse.data.pipe(writeStream);

        writeStream.on('finish', () => {
          api.sendMessage({
            body: `🎧 Here's your music from Spotify enjoy listening\n\nTitle:${title}\n\n💿 Now Playing...`,
            attachment: fs.createReadStream(filePath)
          }, event.threadID);
        });
      } else {
        api.sendMessage("❓ | Sorry, couldn't find the requested music on Spotify.", event.threadID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("🚧 | An error occurred while processing your request.", event.threadID);
    }
  }
};