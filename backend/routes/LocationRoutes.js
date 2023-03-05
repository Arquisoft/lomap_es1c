const express = require('express');
const router = express.Router();

const { LocationController } = require('../controllers/LocationController');

router.post('/', LocationController.createLocation);
router.get('/', LocationController.getAllLocations);


router.get('/:id', LocationController.getLocation);
router.put('/:id', LocationController.updateLocation);
router.delete('/:id', LocationController.deleteLocation);


router.post('/:id/reviews', LocationController.addReview);
router.post('/:id/photos', LocationController.addPhoto);

module.exports = router;