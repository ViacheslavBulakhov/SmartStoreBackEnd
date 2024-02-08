const { ctrlWrapper } = require('../../helpers');
const { Goods } = require('../../models/MongooseModels');

const getAllGoodsByOwner = async (req, res) => {
  const { _id: owner } = req.user;
  const data = await Goods.find({ owner });
  res.json(data);
};

module.exports = {
  getAllGoodsByOwner: ctrlWrapper(getAllGoodsByOwner),
};
