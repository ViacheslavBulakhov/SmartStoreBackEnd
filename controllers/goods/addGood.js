const { ctrlWrapper } = require('../../helpers');
const { Goods } = require('../../models/MongooseModels');

const addGood = async (req, res) => {
  const result = await Goods.create(req.body);
  res.status(201).json(result);
};

module.exports = {
  addGood: ctrlWrapper(addGood),
};
