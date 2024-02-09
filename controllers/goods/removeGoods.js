const { HttpError, ctrlWrapper } = require('../../helpers');
const { Goods } = require('../../models/MongooseModels');
const { deleteImage } = require('../../service/imageService');

const removeGoods = async (req, res) => {
  const { id } = req.params;

  const result = await Goods.findByIdAndRemove(id);

  deleteImage(result.imgId);

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
