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
  for (let i = 0; i < response.length; i++) {
    console.log('index ', i, ' = ', response[i])
    let val = response[i];
    try {
      const createTopic = await Topic.create({
        name: val.name,
        url: val.url,
        description: val.snippet || null,
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
      data = response.data.webPages.value;
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};
