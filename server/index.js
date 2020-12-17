const express = require('express');
const path = require('path');
const morgan = require('morgan')
const dotenv = require('dotenv');
const axios = require('axios');
const app = express();
const db = require('./db')

dotenv.config();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;



let data = '';
let searchTerm = 'ReactJS';

let config = {
  method: 'get',
  url: `https://api.bing.microsoft.com/v7.0/search?q=${searchTerm}`,
  headers: {
    'Ocp-Apim-Subscription-Key': `${API_KEY}`
  },
  data : data
};

axios(config)
.then(function (response) {
  data = response.data.webPages.value
  // console.log(JSON.stringify(response.data));
  // console.log('data = ', response.data.webPages.value[0]);
})
.catch(function (error) {
  console.log(error);
});



app.get('/', (req, res, next) => {
  try {
    if (data) {
      res.send(data);
    }
    next();
  } catch (error) {
    console.log('Error! ', error);
  }
})

module.exports = app
const createApp = () => {

  // Logging middleware
  app.use(morgan('dev'));

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.use((req, res, next) => {
    next()
  })

  // Routes that will be accessed via AJAX should be prepended with api so they are isolated from our GET /* wildcard.
  app.use('/api', require('./api'));

  // // Static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));


  // This middleware will catch any URLs resembling a file extension
  // for example: .js, .html, .css
  // This allows for proper 404s instead of the wildcard '#<{(|' catching
  // URLs that bypass express.static because the given file does not exist.
  app.use((req, res, next) => {
    if (path.extname(req.path).length > 0) {
      res.status(404).end()
    } else {
      next()
    }
  })

  // // sends index.html
  app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // Error catching endware
  app.use((err, req, res, next) => {
    console.error(err, typeof next)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  const server = app.listen(PORT, () => console.log('listening on PORT ' + PORT));

  // sockets would go here
}

const syncDb = () => db.sync()

async function bootApp() {
  await syncDb()
  await createApp();
  await startListening();
}

if (require.main === module) {
  bootApp()
} else {
  createApp()
}

module.exports = app;
