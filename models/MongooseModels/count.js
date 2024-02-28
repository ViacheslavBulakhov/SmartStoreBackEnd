const { Schema, model } = require('mongoose');
const handleMongooseError = require('../../middlewares/handleMongooseError');

const salesCounterSchema = new Schema(
  {
    count: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

salesCounterSchema.post('save', handleMongooseError);

const SalesCounter = model('salesCounter', salesCounterSchema);

module.exports = SalesCounter;
