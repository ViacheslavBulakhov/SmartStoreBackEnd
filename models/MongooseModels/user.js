const { Schema, model } = require('mongoose');
const handleMongooseError = require('../../middlewares/handleMongooseError');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: emailRegexp,
      unique: true,
    },
    personalDiscount: {
      type: Number,
      enum: [0, 3, 5, 7, 10, 12, 15, 20],
      default: 0,
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = User;
