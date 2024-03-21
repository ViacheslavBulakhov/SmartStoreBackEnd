const { ctrlWrapper, HttpError } = require('../../helpers');
const { Goods } = require('../../models/MongooseModels');

const addSubscribers = async (req, res) => {
  const data = req.body;

  const goods = await Goods.findById(data.id);

  if (!goods.subscribers.includes(data.email)) {
    goods.subscribers.push(data.email);
    const result = await goods.save();

    if (!result) {
      throw HttpError(404, 'Not found');
    }
  }

  res.status(200).json({
    message: 'Successful subscription',
  });
};

module.exports = {
  addSubscribers: ctrlWrapper(addSubscribers),
};
