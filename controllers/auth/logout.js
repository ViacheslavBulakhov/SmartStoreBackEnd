const { User } = require('../../models/MongooseModels');

const logout = async (req, res) => {
  const { id } = req.user;

  const result = await User.findByIdAndUpdate(
    id,
    { token: '' },
    {
      new: true,
    }
  );
  console.log(result);

  res.status(204).json();
};

module.exports = logout;
