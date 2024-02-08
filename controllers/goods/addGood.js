const { ctrlWrapper } = require('../../helpers');
const { Goods } = require('../../models/MongooseModels');
const { uploadImage } = require('../../service/imageService');

const addGood = async (req, res) => {
  const { path: tempUpload, originalname: name } = req.file;

  const { url } = await uploadImage(tempUpload, name);

  const filters = JSON.parse(req.body.filters);

  const result = await Goods.create({
    ...req.body,
    filters,
    imgUrl: url,
  });
  res.status(201).json(result);
};

module.exports = {
  addGood: ctrlWrapper(addGood),
};
