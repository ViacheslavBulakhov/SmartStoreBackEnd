const path = require('path');
const fs = require('fs/promises');
const { ctrlWrapper } = require('../../helpers');
const { Goods } = require('../../models/MongooseModels');
const { uploadImage } = require('../../service/imageService');

const imagesDir = path.join(__dirname, '../../', 'public', 'images');

const addGood = async (req, res) => {
  // const { _id } = req.user;
  const { path: tempUpload, originalname: name } = req.file;
  // const filename = `${_id}_${originalname}`;
  // const resultUpload = path.join(imagesDir, filename);

  // await fs.rename(tempUpload, resultUpload);

  // const imgUrl = path.join('images', filename);

  const imgUrl = await uploadImage(tempUpload, name);

  const filters = JSON.parse(req.body.filters);

  const result = await Goods.create({
    ...req.body,
    filters,
    imgUrl: imgUrl.url,
  });
  res.status(201).json(result);
};

module.exports = {
  addGood: ctrlWrapper(addGood),
};
