const { Schema, model } = require('mongoose');
const handleMongooseError = require('../../middlewares/handleMongooseError');

const goodSchema = new Schema({
  categories: {
    type: String,
    required: [true, 'Set categories for goods'],
  },

  brand: {
    type: String,
    required: [true, 'Set brand for goods'],
  },

  title: {
    type: String,
    required: [true, 'Set title for goods'],
  },

  model: {
    type: String,
  },

  maker: {
    type: String,
  },

  amount: {
    type: String,
    required: [true, 'Set amount for goods'],
  },

  dicount: {
    type: Number,
  },

  count: {
    type: Number,
    default: 0,
  },

  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  ],

  filters: Schema.Types.Mixed,
});

goodSchema.post('save', handleMongooseError);

const Goods = model('good', goodSchema);

module.exports = Goods;
