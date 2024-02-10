const fs = require('fs/promises');
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid');
const { HttpError } = require('../helpers');
require('dotenv').config();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const uploadImage = async path => {
  try {
    const result = await cloudinary.uploader.upload(path, {
      public_id: uuidv4(),
    });

    return result;
  } catch (error) {
    throw HttpError(500, 'Internal Server Error');
  } finally {
    await fs.unlink(path);
  }
};

const deleteImage = async id => {
  try {
    const result = await cloudinary.uploader.destroy(id, 'image');
    return result;
  } catch (error) {
    throw HttpError(500, 'Internal Server Error');
  }
};

module.exports = {
  uploadImage,
  deleteImage,
};
