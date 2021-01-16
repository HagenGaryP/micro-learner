const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv');
const { WebClient } = require("@slack/web-api");

dotenv.config();

const PORT = process.env.PORT || 8080;
const BOT_TOKEN = process.env.BOT_TOKEN;

// instance of WebClient class with token from environment variable
const web = new WebClient(process.env.BOT_TOKEN);


// Unix timestamp for tomorrow, when message is scheduled
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate()); // add 1 day to date
let hour = 17, min = 08;
// tomorrow.setHours(hour, min, 0);

// Channel you want to post the message to
const channelId = "D01HG3WV2SE";

// bot variable that initializes a new SlackBot instance which has two values, our token and slack bot's app name.
const bot = new SlackBot({
  token: `${BOT_TOKEN}`,
  name: 'inspire bot'
});


// Response Handler
function handleMessage(message) {
  if(message && message.includes(' random doc')) {
    randomDoc()
  }
}


// random document
const randomDoc = async () => {
  try {
    const res = await axios.get(`http://localhost:${PORT}/api/topics`);

    const topics = res.data;
    const random = Math.floor(Math.random() * topics.length);
    const name = topics[random].name;
    const url = topics[random].url;
    const description = topics[random].description

    const params = {
      icon_emoji: ':male-technologist:'
    }
    // legacy bot post method
    bot.postMessageToChannel(
      'general',
      `:zap: ${name} - *${description}* \n ${url}`,
      params
    );
  } catch (error) {
    console.log('something went wrong! error >>> ', error);
  }
}

/**************   schedule message method   *****************/
// (async () => {
//   // for loop to set desired amount of scheduled messages
//   for (let i = 0; i < 2; i++) {

//     // tomorrow.setDate(tomorrow.getDate());
//     tomorrow.setHours(hour, min, 0);
//     try {
//       // Call the chat.scheduleMessage method using the WebClient
//       const result = await web.chat.scheduleMessage({
//         channel: channelId,
//         // messaging the legacy bot to trigger message post
//         text: `@inspire bot random doc`,
//         // Time to post message, in Unix Epoch timestamp format
//         post_at: tomorrow.getTime() / 1000
//       });
//       console.log(result);
//       min++;
//     }
//     catch (error) {
//       console.error(error);
//     }
//   }
//   // try {
//   //   // Use the `chat.postMessage` method to send a message from this app
//   //   await web.chat.postMessage({
//   //     channel: '#general',
//   //     text: `The current time is ${currentTime}`,
//   //   });
//   // } catch (error) {
//   //   console.log(error);
//   // }

//   // console.log('Message posted!');
// })();

module.exports = {
  bot,
  handleMessage,
  randomDoc,
};
