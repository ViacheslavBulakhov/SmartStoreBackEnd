const express = require('express');

const {
  isValidId,
  upload,
  authenticate,
  isAdmin,
} = require('../../middlewares');

const {
  getAllGoods,
  getGodsById,
  addGood,
  removeGoods,
  updateGoods,
  updateGoodsStatus,
  getAllGoodsByOwner,
} = require('../../controllers/goods');

const goodsRouter = express.Router();

// Public route
goodsRouter.get('/', getAllGoods);
// Private route
goodsRouter.get('/owner', authenticate, getAllGoodsByOwner);

goodsRouter.get('/:id', isValidId, getGodsById);

goodsRouter.patch('/:id/favorite', authenticate, isValidId, updateGoodsStatus);

// Private admin route
goodsRouter.post('/', authenticate, isAdmin, upload.single('img'), addGood);

goodsRouter.put('/:id', authenticate, isAdmin, isValidId, updateGoods);

goodsRouter.delete('/:id', authenticate, isAdmin, isValidId, removeGoods);

module.exports = goodsRouter;
