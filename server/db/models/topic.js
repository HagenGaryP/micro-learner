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
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'https://www.harmonytoc.com/Content/img/offline/tool/audit/placeholder.png'
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Topic;
