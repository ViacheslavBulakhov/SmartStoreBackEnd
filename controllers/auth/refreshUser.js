const jwt = require('jsonwebtoken');
const { User } = require('../../models/MongooseModels');
const { SECRET_KEY } = process.env;

const refreshUser = async (req, res) => {
  const { user } = req;

  const payload = {
    id: user._id,
  };

  const newToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  await User.findByIdAndUpdate(user._id, { token: newToken });

  res.json({
    token: newToken,
    user: {
      number: user.number,
      role: user.role,
      id: user._id,
      personalDiscount: user.personalDiscount,
    },
  });
};

module.exports = refreshUser;
