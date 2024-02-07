const Contact = require('../../models/MongooseModels/goods');

const { HttpError, ctrlWrapper } = require('../../helpers');

const addGood = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = {
  addGood: ctrlWrapper(addGood),
};
