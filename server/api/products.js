const router = require('express').Router();
const { Product } = require('../db/models');
const { Op } = require('sequelize');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.API_KEY;

module.exports = router;

// get all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// Get Product by id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

//Add a new product
router.post('/add', async (req, res, next) => {
  try {
    const createProduct = await Product.create(req.body);
    res.json(createProduct);
  } catch (err) {
    next(err);
  }
});

//Delete
router.delete('/:id', async (req, res, next) => {
  try {
    const numOfDeleted = await Product.destroy({
      where: { id: req.params.id },
    });
    res.json(numOfDeleted);
  } catch (err) {
    next(err);
  }
});

// search new products to add to DB
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
  // let videos = response.videos.value;
  for (let i = 0; i < webPages.length; i++) {
    let val = webPages[i], image = entities[0].image.hostPageUrl || null;
    let description = val.snippet || val.description;
    let category = '';
    if (!description.includes(req.params.searchTerm) ||
        description.includes('game')
    ) {
      continue;
    }

    if (val.name.includes('tutorial') ||
        val.name.includes('how to') ||
        description.includes('how to') ||
        description.includes('tutorial')
    ) {
      // assuming link to tutorial or how-to
      category = 'tutorial';

    } else if (val.name.includes('documentation') || description.includes('documentation')) {
      category = 'documentation';
    } else {
      category = 'article';
    }

    try {
      const createProduct = await Product.create({
        name: val.name,
        url: val.url,
        imageUrl: image,
        category: category,
        description: description,
      });
      if (createProduct) {
        dataArray.push(createProduct);
      }
    } catch (err) {
      next(err);
    }
  }
  return res.send(dataArray);
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
  return axios(config)
    .then((response) => {
      data = response.data;
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};
