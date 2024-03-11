const { ctrlWrapper } = require('../../helpers');
const { SalesPosts } = require('../../models/MongooseModels');
const { uploadImage, deleteImage } = require('../../service/imageService');

const addSalesPosts = async (req, res) => {
  const { newPhotos } = req.files;

  const deletedPhotos = req.body?.deletedPhotos;

  const newSalesPostsPhotos = [];

  if (newPhotos && newPhotos.length > 0) {
    const pathNewPhotos = newPhotos.map(item => item.path);

    for (const path of pathNewPhotos) {
      const result = await uploadImage(path);
      newSalesPostsPhotos.push({ url: result.url, id: result.public_id });
    }
  }

  const data = await SalesPosts.find({});

  let updatedSalesPhotos = data[0]?.img ? [...data[0].img] : [];

  if (deletedPhotos) {
    if (typeof deletedPhotos === 'string') {
      await deleteImage(deletedPhotos);
      updatedSalesPhotos = [
        ...data[0].img.filter(item => item.id !== deletedPhotos),
      ];
    } else {
      for (const photoId of deletedPhotos) {
        await deleteImage(photoId);
      }
      updatedSalesPhotos = [
        ...data[0].img.filter(item => !deletedPhotos.includes(item.id)),
      ];
    }
  }

  const result = await SalesPosts.findByIdAndUpdate(
    data[0]._id,
    {
      img: [...updatedSalesPhotos, ...newSalesPostsPhotos],
    },
    {
      new: true,
    }
  );

  res.status(200).json(result);
};

module.exports = {
  addSalesPosts: ctrlWrapper(addSalesPosts),
};
