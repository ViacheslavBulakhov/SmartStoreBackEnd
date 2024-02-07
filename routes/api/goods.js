const express = require('express');

const { isValidId, validateBody } = require('../../middlewares');
const { updateFavoriteShema } = require('../../models/JoiSchemas');

const {
  getAllGoods,
  getContactById,
  addGood,
  removeGoods,
  updateGoods,
} = require('../../controllers/contacts');

const goodsRouter = express.Router();

goodsRouter.get('/', getAllGoods);

goodsRouter.get('/:id', isValidId, getContactById);

goodsRouter.post('/', addGood);

goodsRouter.put('/:id', isValidId, updateGoods);

goodsRouter.patch(
  '/:goodsId/favorite',
  isValidId,
  validateBody(updateFavoriteShema),
  updateGoods
);

goodsRouter.delete('/:id', isValidId, removeGoods);

module.exports = goodsRouter;
