const Contact = require('../../models/MongooseModels/goods');

const { HttpError, ctrlWrapper } = require('../../helpers');

const removeGoods = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndRemove(id);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json({
    message: 'Delete success',
  });
};

module.exports = {
  removeGoods: ctrlWrapper(removeGoods),
};
