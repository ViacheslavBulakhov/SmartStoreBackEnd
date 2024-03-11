const { Schema, model } = require('mongoose');
const handleMongooseError = require('../../middlewares/handleMongooseError');

const salesPostsSchema = new Schema(
  {
    img: Schema.Types.Mixed,
  },
  { versionKey: false, timestamps: true }
);

salesPostsSchema.post('save', handleMongooseError);

const SalesPosts = model('salesPosts', salesPostsSchema);

module.exports = SalesPosts;
