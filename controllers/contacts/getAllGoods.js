const Contact = require('../../models/MongooseModels/goods');

const { ctrlWrapper } = require('../../helpers');

const getAllGoods = async (req, res) => {
  const data = await Contact.find({});
  res.json(data);
};

module.exports = {
  getAllGoods: ctrlWrapper(getAllGoods),
};
