//Not used
class Review {
    constructor(id=null, rating, text, author) {
      if (typeof rating !== "number" || rating < 0 || rating > 5) {
        throw new Error("Invalid rating value. Must be a number between 0 and 5");
      }
      if (!author) {
        throw new Error("Review author must not be null");
      }
      this.id = id ? id : this.generateRandomId();
      this.rating = rating;
      this.text = text || null;
      this.author = author;
    }
  }
  module.exports = Review;