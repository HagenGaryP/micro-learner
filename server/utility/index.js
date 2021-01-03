const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv');
const { WebClient, LogLevel } = require("@slack/web-api");


dotenv.config();

const PORT = process.env.PORT || 8080;
const BOT_TOKEN = process.env.BOT_TOKEN;

// Create a new instance of the WebClient class with the token read from your environment variable
const web = new WebClient(process.env.BOT_TOKEN);
// The current date
const currentTime = new Date().toTimeString();

// Unix timestamp for tomorrow morning at 9AM
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate());
tomorrow.setHours(19, 43, 0);

// Channel you want to post the message to
const channelId = "D01HG3WV2SE’";



// bot variable that initializes a new SlackBot instance which has two values, our token and slack bot's app name.
const bot = new SlackBot({
  token: `${BOT_TOKEN}`,
  name: 'inspire bot'
});


// Response Handler
function handleMessage(message) {
  if(message.includes(' help')) {
      runHelp()
  } else if(message.includes(' random doc')) {
    randomDoc()
  }
}


// random document
const randomDoc = async () => {
  console.log('random doc is running.  this is outside the try catch')
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
    console.log('INSIDE RANDOM DOC FUNCTION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> res = ', res);
    // return `:zap: ${name} - *${description}* \n ${url}`

    bot.postMessageToChannel(
      'general',
      `:zap: ${name} - *${description}* \n ${url}`,
      params
    );

  } catch (error) {
    console.log('something went wrong! error >>> ', error);
  }
}

// TEXT RETURNED FROM HANDLE MESSAGE
const text = async () => await randomDoc();

function runHelp() {
  const params = {
    icon_emoji: ':question:'
  }

  bot.postMessageToChannel(
    'random',
    `Type *@inspire bot* with *random doc* to get a Chuck Norris random joke and *help* to get this instruction again`,
    params
  );
}

(async () => {
  // schedule message method
  try {
    // Call the chat.scheduleMessage method using the WebClient
    const result = await web.chat.scheduleMessage({
      channel: `#random`,
      text: `@inspire bot random doc`,
      // Time to post message, in Unix Epoch timestamp format
      post_at: tomorrow.getTime() / 1000
    });
    console.log('>>>>>>>>>>>>>>   TEXT   >>>>>>>>>>> ', text(), '     <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }

  // try {
  //   await web.chat.postMessage({
  //     channel: '#general',
  //     text: text,
  //   });
  // } catch (error) {
  //   console.log('it did not post the message correctly.  error = ', error)
  // }
  try {
    // Use the `chat.postMessage` method to send a message from this app
    await web.chat.postMessage({
      channel: '#general',
      text: `The current time is ${currentTime}`,
    });
  } catch (error) {
    console.log(error);
  }

  console.log('Message posted!');
})();

module.exports = {
  bot,
  handleMessage,
  randomDoc,
};
