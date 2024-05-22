const axios = require("axios");
const fs = require("fs");
const path = require("path");
const vipData = fs.readFileSync(path.join(__dirname, "vip.json"), "utf8");
const vipJson = JSON.parse(vipData);
function isVip(senderID) {
  return vipJson.permission.includes(senderID.toString());
}

module.exports = {
	config: {
		name: "oppai",
		version: "1.0",
		author: "Kaizenji",
		countDown: 5,
		role: 0,
		shortDescription: "random oppai",
		longDescription: "sends a random anime oppai",
		category: "18+ VIP",
		guide: "{pn}oppai"
	},

	onStart: async function ({ api, event, args, message }) {
   
if (!isVip(event.senderID)) {
      api.sendMessage("You are not a VIP member, contact admin(s) to access VIP command's.", event.threadID, event.messageID);
      return;
    }

	 var link = [ 
     "https://i.imgur.com/Tr6tu3E.gif",
     "https://i.imgur.com/4c9EnSQ.gif",
     "https://i.imgur.com/tWJ1B9O.gif",
     "https://i.imgur.com/WRuhtj8.gif",
     "https://i.imgur.com/sgap5iI.gif",
     "https://i.imgur.com/MPYasFf.gif",
     "https://i.imgur.com/3Bhn2B6.gif",
     "https://i.imgur.com/pOE44WO.gif",
     "https://i.imgur.com/PqfUoyn.gif",
     "https://i.imgur.com/ImZMsF5.gif",
     "https://i.imgur.com/5cmPWSA.gif",
     "https://i.imgur.com/RLbxSDR.gif",
     "https://i.imgur.com/hrXpGEV.gif",
     "https://i.imgur.com/F8lBsen.gif",
     "https://i.imgur.com/o9D2ciI.gif",
     "https://i.imgur.com/tsbM2nn.gif",
     "https://i.imgur.com/pYe0Qyg.gif",
     "https://i.imgur.com/eWD8ktZ.gif",
     "https://i.imgur.com/IVNoblE.gif",
     "https://i.imgur.com/6SJ1DLy.gif",
     "https://i.imgur.com/jZc983o.gif",
     "https://i.imgur.com/FBGsbIE.gif",
     "https://i.imgur.com/Esb0WG6.gif",
	]
let img = link[Math.floor(Math.random()*link.length)]
message.send({
	body: '「 oppai🥵 」',attachment: await global.utils.getStreamFromURL(img)
})
}
		 }