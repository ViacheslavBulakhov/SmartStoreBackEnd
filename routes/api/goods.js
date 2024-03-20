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
  addReviews,
  addSubscribers,
} = require('../../controllers/goods');

const goodsRouter = express.Router();

// Public route
goodsRouter.get('/', getAllGoods);
goodsRouter.post('/subscribe', addSubscribers);

// Private route
goodsRouter.get('/owner', authenticate, getAllGoodsByOwner);

goodsRouter.get('/:id', isValidId, getGodsById);

goodsRouter.patch('/:id/favorite', authenticate, isValidId, updateGoodsStatus);

// Private admin route

goodsRouter.post(
  '/',
  upload.fields([
    { name: 'img', maxCount: 1 },
    { name: 'extraPhotos', maxCount: 10 },
  ]),
  authenticate,
  isAdmin,
  addGood
);

goodsRouter.put(
  '/:id',
  upload.fields([
    { name: 'img', maxCount: 1 },
    { name: 'extraPhotos', maxCount: 10 },
  ]),
  authenticate,
  isAdmin,
  isValidId,
  updateGoods
);

goodsRouter.put('/addReviews/:id', authenticate, isValidId, addReviews);

goodsRouter.delete('/:id', authenticate, isAdmin, isValidId, removeGoods);

module.exports = goodsRouter;
