const { User } = require('../../models/MongooseModels');

const updateUserSubscription = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;

  await User.findByIdAndUpdate(id, { subscription });

  res.status(200).json({ message: `user status updated to ${subscription}` });
};

module.exports = updateUserSubscription;
