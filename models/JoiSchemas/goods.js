const Joi = require('joi');

const updateFavoriteShema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  updateFavoriteShema,
};
