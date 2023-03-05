const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/ReviewController.js');

router.get('/', reviewController.getAllReviews);

router.post('/', reviewController.addReview);

module.exports = reviewRouter;