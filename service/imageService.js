const fs = require('fs/promises');
const { HttpError } = require('../helpers');
const multer = require('multer');
const { upload } = require('../middlewares');
const cloudinary = require('cloudinary').v2;

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: 'dsd2cneki',
  api_key: '722594945474963',
  api_secret: 'L7F39HAVW4sfpFCDjb2bE0RfzZY',
});

const uploadImage = async path => {
  const result = await cloudinary.uploader
    .upload(path, { public_id: 'SmartStoreImage' })
    .then(data => data);

  await fs.unlink(path);
  return result;
};

const uploadErrorHandler = async (fieldName, name) => {
  const uploadFile = upload.single('img');

  return function (req, res, next) {
    uploadFile(req, res, function (err) {
      if (err instanceof multer.MulterError || err) {
        next(HttpError(400));
      }

      next();
    });
  };
};

//  const deleteImage=async()=>(id) {
//     return await cloudinary.uploader.destroy(id, 'image');
//   }

module.exports = { uploadImage, uploadErrorHandler };
