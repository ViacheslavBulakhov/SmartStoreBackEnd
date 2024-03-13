const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../../models/MongooseModels');
const { HttpError, calculateDiscount } = require('../../helpers');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { number, password } = req.body;
  const user = await User.findOne({ number });

  if (!user) {
    throw HttpError(401, 'Number or password is wrong');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, 'Number or password is wrong');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  await User.findByIdAndUpdate(user.id, { token });

  res.json({
    token,
    user: {
      number: user.number,
      role: user.role,
      id: user._id,
      personalDiscount: calculateDiscount(user.totalPurchaseAmount),
      totalPurchaseAmount: user.totalPurchaseAmount,
    },
  });
};

module.exports = login;
