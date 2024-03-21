const { Schema, model } = require('mongoose');
const handleMongooseError = require('../../middlewares/handleMongooseError');

const { sendEmailAboutGoodsCount } = require('../../service/mail');

const goodSchema = new Schema(
  {
    categories: {
      type: String,
      required: [true, 'Set categories for goods'],
    },

    type: {
      type: String,
      required: [true, 'Set type for goods'],
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

    discount: {
      type: Number,
    },

    count: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
    },

    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],

    reviews: [
      {
        name: { type: String, required: true },
        feedbackPoints: { type: Number, required: true },
        text: { type: String, required: true },
        date: { type: Date, required: true },
      },
    ],

    subscribers: {
      type: [String],
      default: [],
    },

    imgUrl: {
      type: String,
      required: true,
    },

    imgId: {
      type: String,
    },

    extraPhotos: Schema.Types.Mixed,

    filters: Schema.Types.Mixed,
  },
  { timestamps: true }
);

goodSchema.post('save', handleMongooseError);

const Goods = model('good', goodSchema);
module.exports = Goods;

// Goods.watch().on('change', data => sendEmailAboutGoodsCount(data));
