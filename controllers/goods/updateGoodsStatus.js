const { HttpError, ctrlWrapper } = require('../../helpers');
const { Goods } = require('../../models/MongooseModels');

const updateGoodsStatus = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const goodsItem = await Goods.findById(id);
  if (!goodsItem) {
    throw HttpError(404, 'Not found');
  }

  const isNew = goodsItem.favorites.find(
    item => item.toString() === _id.toString()
  );

  const newArray = () => {
    if (![...goodsItem.favorites].length) {
      return [_id.toString()];
    }
    return isNew
      ? [...goodsItem.favorites].filter(
          item => item.toString() !== _id.toString()
        )
      : [...goodsItem.favorites, _id.toString()];
  };

  const result = await Goods.findByIdAndUpdate(
    id,
    {
      favorites: newArray(),
    },
    { new: true }
  );

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

module.exports = {
  updateGoodsStatus: ctrlWrapper(updateGoodsStatus),
};
