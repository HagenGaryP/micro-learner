const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
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
  category: {
    type: Sequelize.STRING,
  },
  video: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Product;
