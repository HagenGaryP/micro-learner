const router = require('express').Router();
const { Topic } = require('../db/models');
const { Op } = require('sequelize');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.API_KEY;

module.exports = router;

// get all topics
router.get('/', async (req, res, next) => {
  try {
    const topics = await Topic.findAll();
    res.json(topics);
  } catch (err) {
    next(err);
  }
});

// Get Topic by id
router.get('/:id', async (req, res, next) => {
  try {
    const topic = await Topic.findByPk(req.params.id);
    res.json(topic);
  } catch (err) {
    next(err);
  }
});

//Add a new topic
router.post('/', async (req, res, next) => {
  try {
    const createTopic = await Topic.create(req.body);
    res.json(createTopic);
  } catch (err) {
    next(err);
  }
});

//Delete
router.delete('/:id', async (req, res, next) => {
  try {
    const numOfDeleted = await Topic.destroy({
      where: { id: req.params.id },
    });
    res.json(numOfDeleted);
  } catch (err) {
    next(err);
  }
});

// search new topics to add to DB
router.get('/search/:searchTerm', async (req, res, next) => {
  let response;
  try {
    response = await fetchSearch(req.params.searchTerm);
  } catch (error) {
    next(error);
  }
  const dataArray = [];
  let webPages = response.webPages.value;
  let entities = response.entities.value;
  let videos = response.videos.value;
  // console.log('>>>>>>>>>>>>>>>>>      RESPONSE.DATA        >>>>>>>>>>>>>>>>>>>');
  // console.log(' >>>>  webPages = ', webPages);
  // console.log(' >>>>>>>  entities = ', entities);
  // console.log(' videos = ', videos, '  >>>>>>>>>>>>> ');
  // console.log(' rankingResponse = ', response.rankingResponse.mainline.items);

  for (let i = 0; i < webPages.length; i++) {
    let val = webPages[i], image = entities[0].image.hostPageUrl || null;
    // console.log('val = ', val, '  image = ', image)
    if (!val.snippet || !val.name) continue;
    // if (!val.snippet.includes(req.params.searchTerm) && !val.name.includes(req.params.searchTerm)) continue;

    try {
      // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
      const createTopic = await Topic.create({
        name: val.name,
        url: val.url,
        description: val.snippet,
        imageUrl: image,
      });
      if (createTopic) {
        res.json(createTopic);
      } else {
        continue;
      }
    } catch (err) {
      next(err);
    }
  }
})

const fetchSearch = async (searchTerm) => {
  let data = '';
  let config = {
    method: 'get',
    url: `https://api.bing.microsoft.com/v7.0/search?q=${searchTerm}`,
    headers: {
      'Ocp-Apim-Subscription-Key': `${API_KEY}`,
    },
    data: data,
  };
  return axios
    .get(
      `https://api.bing.microsoft.com/v7.0/search?q=${searchTerm}`,
      config
    )
    .then((response) => {
      data = response.data;
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};
