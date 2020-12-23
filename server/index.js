const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const db = require('./db');

const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const socketio = require('socket.io');

const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY;

module.exports = app;

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
if (process.env.NODE_ENV !== 'production') require('../secrets');

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // compression middleware
  app.use(compression());

  // session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use((req, res, next) => {
    next();
  });

  app.use(passport.initialize());
  app.use(passport.session());

  // api routes
  app.use('/api', require('./api'));

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const startListening = () => {
  // start listening
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`));

  // set up our socket control center
  const io = socketio(server);
  require('./socket')(io);
};

const syncDb = () => db.sync();

async function bootApp() {
  await syncDb();
  await createApp();
  await startListening();
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp();
} else {
  createApp();
}


/******************************************************************************************************************
**************************  inspire bot     ******************************************************************************************************************
*/


const BOT_TOKEN = process.env.BOT_TOKEN;

// bot variable that initializes a new SlackBot instance which has two values, our token and app name.
const bot = new SlackBot({
  token: `${BOT_TOKEN}`,
  name: 'inspire bot'
});

/* Start handler
Our Bot does nothing now even though it's running. Let's return a message.
The bot.on handler sends the welcome message. We passed two parameters,
the 'start' and a function which holds a params variable which also holds the slack emoji.
Note: Slack emoji have codes, you can find them at https://slackmojis.com/
*/

const INITIAL_MESSAGE = 'Get inspired while working with @inspire_bot';

// bot.on('start', () => {
//     const params = {
//         icon_emoji: ':robot_face:'
//     }

//     bot.postMessageToChannel(
//         'random',
//         `${INITIAL_MESSAGE}`,
//         params
//     );
// })
/**
We also initialized the bot.postMessageToChannel function which is a SlackBot.js method to post a message to a channel.
In this function, we pass the channel name we want to post to, the message in a string, and the params variable we declared earlier for the emoji.
I used the #random channel and sent Get inspired while working with @inspire_bot to it.


- You can also post messages to users and groups.

    // define existing username instead of 'user_name'
    bot.postMessageToUser('user_name', 'Hello world!', params);


    // define private group instead of 'private_group', where bot exist
    bot.postMessageToGroup('private_group', 'Hello world!', params);
*/

// Error Handler - a function to check for errors and return them
bot.on('error', (err) => {
    console.log(err);
})


/**************** MESSAGE HANDLER - build the main bot functionality *******************************

we'll be using the quotes JSON from the extension I built as our quotes API.
The JSON can be found with this URL: https://raw.githubusercontent.com/BolajiAyodeji/inspireNuggets/master/src/quotes.json

When a user mentions our bot and adds inspire me, the bot returns a random quote from inspireNuggets.
When the user types random joke, it returns a random joke from the Chuck Norris API.
And when the user types help, it returns the instruction guide.

*/
// Message Handler
bot.on('message', (data) => {
  if(data.type !== 'message' || data.subtype === 'bot_message') {
    return;
  } else {
    // console.log('data >>>>> ', data)
    handleMessage(data.text);
  }
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



/************ Now create the function we need ***************************

inspireMe()

You can use any API you prefer, you'll just have to iterate differently to get your data depending on if your API returns an array or object - whichever it returns, it's not a big deal.
*/

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

// randomJoke() We're getting the jokes from the Chuck Norris API from this endpoint https://api.chucknorris.io/jokes/random.
// This is a real API that returns a random joke on every request, so we don't have to do Math.floor() again.
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
function randomDoc() {
  axios.get('http://localhost:8080/api/topics')
    .then(res => {
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
    })
}

// runHelp() - This is similar to our welcome message: we just want to return a custom text when the user adds help to the request.
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
