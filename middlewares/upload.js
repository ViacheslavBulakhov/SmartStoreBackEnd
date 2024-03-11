const multer = require('multer');
const path = require('path');

const tempDirMain = path.join(__dirname, '../', 'temp', 'main');
const tempDirExtra = path.join(__dirname, '../', 'temp', 'extra');
const tempDirSales = path.join(__dirname, '../', 'temp', 'sales');

const multerConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'img') {
      cb(null, tempDirMain);
    } else if (file.fieldname === 'newPhotos') {
      cb(null, tempDirSales);
    } else {
      cb(null, tempDirExtra);
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
