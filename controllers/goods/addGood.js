const { ctrlWrapper } = require('../../helpers');
const { Goods } = require('../../models/MongooseModels');
const { uploadImage } = require('../../service/imageService');

const addGood = async (req, res) => {
  const { path } = req.file;

  const imgData = await uploadImage(path);

  const filters = JSON.parse(req.body?.filters) || [];

  const result = await Goods.create({
    ...req.body,
    filters,
    reviews: [],
    imgUrl: imgData.url,
    imgId: imgData.public_id,
  });
  res.status(201).json(result);
};

module.exports = {
  addGood: ctrlWrapper(addGood),
};
