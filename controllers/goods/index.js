const { getAllGoods } = require('./getAllGoods');
const { getGodsById } = require('./getGoodsById');
const { addGood } = require('./addGood');
const { updateGoods } = require('./updateGoods');
const { updateGoodsStatus } = require('./updateGoodsStatus');
const { getAllGoodsByOwner } = require('./getAllGoodsByOwner');
const { addReviews } = require('./addReviews');
const { addSubscribers } = require('./addSubscribers');

const { removeGoods } = require('./removeGoods');

module.exports = {
  getAllGoods,
  getAllGoodsByOwner,
  getGodsById,
  addGood,
  updateGoods,
  updateGoodsStatus,
  removeGoods,
  addReviews,
  addSubscribers,
};
