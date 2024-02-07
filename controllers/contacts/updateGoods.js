const Contact = require('../../models/MongooseModels/goods');

const { HttpError, ctrlWrapper } = require('../../helpers');

const updateGoods = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, {
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
