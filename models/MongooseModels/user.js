const { Schema, model } = require('mongoose');
const handleMongooseError = require('../../middlewares/handleMongooseError');

const numberRegexp = /^\+?[0-9]{12}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
      minlength: 6,
    },
    number: {
      type: String,
      required: [true, 'Number is required'],
      match: numberRegexp,
      unique: true,
    },
    totalPurchaseAmount: {
      type: Number,
      default: 0,
    },

    personalDiscount: {
      type: Number,
      enum: [0, 3, 5, 7, 10, 12, 15, 20],
      default: 0,
    },
    token: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = User;
