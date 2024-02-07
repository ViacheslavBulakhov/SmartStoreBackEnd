const { getAllGoods } = require('./getAllGoods');
const { getContactById } = require('./getContactById');
const { addGood } = require('./addGood');
const { updateGoods } = require('./updateGoods');

const { removeGoods } = require('./removeGoods');

module.exports = {
  getAllGoods,
  getContactById,
  addGood,
  updateGoods,
  removeGoods,
};
