const { HttpError, ctrlWrapper } = require('../../helpers');
const { Goods } = require('../../models/MongooseModels');

const updateGoods = async (req, res) => {
  const { id } = req.params;

  const result = await Goods.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

module.exports = {
  updateGoods: ctrlWrapper(updateGoods),
};
