const Sequelize = require('sequelize');
const db = require('../db');

const Topic = db.define('topic', {
  name: {
    type: Sequelize.STRING,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: "NO DESCRIPTION",
  },
})

module.exports = Topic;
