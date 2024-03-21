const { HttpError, ctrlWrapper } = require('../../helpers');

const { Goods } = require('../../models/MongooseModels');
const { deleteImage, uploadImage } = require('../../service/imageService');
const { sendEmailAboutGoodsCount } = require('../../service/mail');

const updateGoods = async (req, res) => {
  const { id } = req.params;

  const { img, extraPhotos } = req.files;

  const newExtraPhotos = [];

  if (extraPhotos && extraPhotos.length > 0) {
    const pathExtraPhotos = extraPhotos.map(item => item.path);

    for (const path of pathExtraPhotos) {
      const result = await uploadImage(path);
      newExtraPhotos.push({ url: result.url, id: result.public_id });
    }
  }

  const extraPhotosForDelete = req.body?.extraPhotosForDelete || null;

  const currentGoods = await Goods.findById(id);

  let updatedExtraPhotos = currentGoods?.extraPhotos
    ? [...currentGoods.extraPhotos]
    : [];

  if (extraPhotosForDelete) {
    if (typeof extraPhotosForDelete === 'string') {
      await deleteImage(extraPhotosForDelete);

      updatedExtraPhotos = [
        ...currentGoods.extraPhotos.filter(
          item => item.id !== extraPhotosForDelete
        ),
      ];
    } else {
      for (const photoId of extraPhotosForDelete) {
        await deleteImage(photoId);
      }

      updatedExtraPhotos = [
        ...currentGoods.extraPhotos.filter(
          item => !extraPhotosForDelete.includes(item.id)
        ),
      ];
    }
  }

  let imgData = null;

  if (img) {
    imgData = await uploadImage(img[0].path);
    await deleteImage(currentGoods.imgId);
  }

  const filters = JSON.parse(req.body?.filters) || [];

  const newGoodsObj = {
    ...req.body,
    extraPhotos: [...updatedExtraPhotos, ...newExtraPhotos],
  };

  if (filters.length > 0) {
    newGoodsObj.filters = filters;
  }

  if (imgData) {
    newGoodsObj.imgUrl = imgData.url;
    newGoodsObj.imgId = imgData.public_id;
  }

  delete newGoodsObj.extraPhotosForDelete;

  const result = await Goods.findByIdAndUpdate(id, newGoodsObj, {
    new: true,
  });
  if (
    Number(req.body.count) !== Number(currentGoods.count) &&
    Number(req.body.count) !== 0
  ) {
    sendEmailAboutGoodsCount(currentGoods);
  }
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

module.exports = {
  updateGoods: ctrlWrapper(updateGoods),
};
