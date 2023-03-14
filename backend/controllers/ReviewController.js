//Utilizamos nuestra clase solid para parsear.
//const solid = require('../solid/Solid.js');

const Review = require('../models/Review');


  async function getAllReviews(req, res) {
    try {
      const reviews = await solid.parseReviews(req.session.webId);
      const reviewObjects = reviews.map((review) => new Review(review.rating, review.text, review.author));
      res.json(reviewObjects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching reviews' });
    }
  }

  async function addReview(req, res) {
    try {
      const location = await solid.parseLocation(req.body.location);
      const review = new Review(req.body.rating, req.body.text, req.session.webId);
      location.addReview(review);
      await solid.saveLocation(location, req.session.webId);
      res.json(review);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding review' });
    }
  }
  module.exports={
    getAllReviews,addReview
  };