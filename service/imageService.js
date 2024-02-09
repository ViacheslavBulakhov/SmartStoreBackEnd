const fs = require('fs/promises');
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid');

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const uploadImage = async path => {
  const result = await cloudinary.uploader
    .upload(path, { public_id: uuidv4() })
    .then(data => data);

  await fs.unlink(path);
  return result;
};

//  const deleteImage=async()=>(id) {
//     return await cloudinary.uploader.destroy(id, 'image');
//   }

module.exports = { uploadImage };
