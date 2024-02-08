const validateBody = require('./validateBody');
const isValidId = require('./isValidId');
const handleMongooseError = require('./handleMongooseError');
const authenticate = require('./authenticate');
const isAdmin = require('./isAdmin');
const upload = require('./upload');

module.exports = {
  validateBody,
  isValidId,
  handleMongooseError,
  authenticate,
  isAdmin,
  upload,
};
