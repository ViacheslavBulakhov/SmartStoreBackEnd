const { ctrlWrapper } = require('../../helpers');
const { Goods } = require('../../models/MongooseModels');
const { uploadImage } = require('../../service/imageService');

const addGood = async (req, res) => {
  const { img, extraPhotos } = req.files;

  const pathExtraPhotos = extraPhotos.map(item => item.path);

  const newExtraPhotos = [];

  for (const path of pathExtraPhotos) {
    const result = await uploadImage(path);
    newExtraPhotos.push({ url: result.url, id: result.public_id });
  }

  const imgData = await uploadImage(img[0].path);

  const filters = JSON.parse(req.body?.filters) || [];

  const result = await Goods.create({
    ...req.body,
    filters,
    reviews: [],
    imgUrl: imgData.url,
    imgId: imgData.public_id,
    extraPhotos: newExtraPhotos,
  });
  res.status(201).json(result);
};

module.exports = {
  addGood: ctrlWrapper(addGood),
};
