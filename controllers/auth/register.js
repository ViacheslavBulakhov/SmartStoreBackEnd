const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../../models/MongooseModels');
const { HttpError } = require('../../helpers');

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const payload = {
    id: email,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    token,
  });

  res.status(201).json({
    user: {
      number: user.number,
      subscription: newUser.subscription,
      token,
    },
  });
};

module.exports = register;
