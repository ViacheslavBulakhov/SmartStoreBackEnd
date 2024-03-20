const { ctrlWrapper } = require('../../helpers');
const { Goods } = require('../../models/MongooseModels');

const addSubscribers = async (req, res) => {
  const data = req.body;
  console.log(data);
  const goods = await Goods.findById(data.id);
  goods.subscribers.push(data.email);
  await goods.save();
  //   const result = await Goods.findByIdAndUpdate(id, newGoodsObj, {
  //     new: true,
  //   });

  //   if (!result) {
  //     throw HttpError(404, 'Not found');
  //   }

  //   res.json(result);
};

module.exports = {
  addSubscribers: ctrlWrapper(addSubscribers),
};
