const { HttpError, ctrlWrapper } = require('../../helpers');
const { Goods } = require('../../models/MongooseModels');

const addReviews = async (req, res) => {
  const { id } = req.params;
  const { reviews } = req.body;

  const result = await Goods.findByIdAndUpdate(
    id,
    { $push: { reviews: reviews } },
    { upsert: true, new: true }
  );

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

module.exports = {
  addReviews: ctrlWrapper(addReviews),
};
