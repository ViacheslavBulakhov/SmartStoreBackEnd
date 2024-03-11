const express = require('express');
const { addSalesPosts } = require('../../controllers/salesPosts/addSalesPosts');
const { authenticate, upload } = require('../../middlewares');
const { getSalesPosts } = require('../../controllers/salesPosts/getSalesPosts');

const salesPostsRouter = express.Router();

salesPostsRouter.patch(
  '/add',
  upload.fields([{ name: 'newPhotos', maxCount: 10 }]),
  authenticate,
  addSalesPosts
);

salesPostsRouter.get('/get', getSalesPosts);

module.exports = salesPostsRouter;
