const router = require('express').Router();
const { Topic } = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const topics = await Topic.findAll()
    res.json(topics)
  } catch (err) {
    next(err)
  }
})

router.get('/:topicId', async (req, res, next) => {
  try {
    const topic = await Topic.findByPk(req.params.TopicId)
    res.json(topic)
  } catch (err) {
    console.log('the error is in the api route')
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const createTopic = await Topic.create(req.body)
    res.json(createTopic)
  } catch (err) {
    next(err)
  }
})

module.exports = router;
