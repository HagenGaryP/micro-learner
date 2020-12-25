const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 8080;
const BOT_TOKEN = process.env.BOT_TOKEN;

// bot variable that initializes a new SlackBot instance which has two values, our token and slack bot's app name.
const bot = new SlackBot({
  token: `${BOT_TOKEN}`,
  name: 'inspire bot'
});


// Response Handler
function handleMessage(message) {
  if(message.includes(' inspire me')) {
      inspireMe()
  } else if(message.includes(' random joke')) {
      randomJoke()
  } else if(message.includes(' help')) {
      runHelp()
  } else if(message.includes(' random doc')) {
    randomDoc()
  }
}

function inspireMe() {
  axios.get('https://raw.githubusercontent.com/BolajiAyodeji/inspireNuggets/master/src/quotes.json')
    .then(res => {
      const quotes = res.data;
      const random = Math.floor(Math.random() * quotes.length);
      const quote = quotes[random].quote
      const author = quotes[random].author

      const params = {
        icon_emoji: ':male-technologist:'
      }

      bot.postMessageToChannel(
        'random',
        `:zap: ${quote} - *${author}*`,
        params
      );
    })
}

function randomJoke() {
  axios.get('https://api.chucknorris.io/jokes/random')
    .then(res => {
      const joke = res.data.value;

      const params = {
        icon_emoji: ':smile:'
      }

      bot.postMessageToChannel(
        'random',
        `:zap: ${joke}`,
        params
      );

    })
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

    bot.postMessageToChannel(
      'random',
      `:zap: ${name} - *${description}* \n ${url}`,
      params
    );

  } catch (error) {
    console.log('something went wrong! error >>> ', error);
  }
}

function runHelp() {
  const params = {
    icon_emoji: ':question:'
  }

  bot.postMessageToChannel(
    'random',
    `Type *@inspire bot* with *inspire me* to get an inspiring techie quote, *random joke* to get a Chuck Norris random joke and *help* to get this instruction again`,
    params
  );
}


module.exports = {
  bot,
  handleMessage,
};
