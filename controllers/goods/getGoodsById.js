const { HttpError, ctrlWrapper } = require('../../helpers');
const { Goods } = require('../../models/MongooseModels');

const getGodsById = async (req, res) => {
  const { id } = req.params;

  const result = await Goods.findById(id);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

module.exports = {
  getGodsById: ctrlWrapper(getGodsById),
};
