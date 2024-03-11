const { ctrlWrapper } = require('../../helpers');
const { SalesPosts } = require('../../models/MongooseModels');

const getSalesPosts = async (req, res) => {
  const data = await SalesPosts.find({});

  res.json(data[0]);
};

module.exports = {
  getSalesPosts: ctrlWrapper(getSalesPosts),
};
