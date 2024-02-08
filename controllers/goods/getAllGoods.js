const { ctrlWrapper } = require('../../helpers');
const { Goods } = require('../../models/MongooseModels');

const getAllGoods = async (req, res) => {
  const data = await Goods.find({});
  res.json(data);
};

module.exports = {
  getAllGoods: ctrlWrapper(getAllGoods),
};
