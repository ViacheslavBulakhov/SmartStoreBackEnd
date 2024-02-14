const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../../models/MongooseModels');
const { HttpError } = require('../../helpers');

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { password, number } = req.body;

  const user = await User.findOne({ number });

  if (user) {
    throw HttpError(409, 'Number in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const payload = {
    id: number,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  const newUser = await User.create({
    number,
    password: hashPassword,
    token,
  });

  res.status(201).json({
    token,
    user: {
      number,
      role: newUser.role,
      personalDiscount: newUser.personalDiscount,
    },
  });
};

module.exports = register;
