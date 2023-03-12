class Location {
    constructor(id =null,name, address, latitude, longitude,category = null,  reviews = [], photos = []) {

      if (!name || name.trim().length === 0) {
        throw new Error('Location name cannot be null or empty');
      }
      if (!address || address.trim().length === 0) {
        throw new Error('Location address cannot be null or empty');
      }
      if (isNaN(latitude) || isNaN(longitude)) {
        throw new Error('Location latitude and longitude must be numbers');
      }

      this.id = id ? id : this.generateRandomId();
      this.name = name;
      this.address = address;
      this.latitude = latitude;
      this.longitude = longitude;
      this.category = category;
      this.reviews = reviews;
      this.photos = photos;
    }
  
    addReview(review) {
      this.reviews.push(review);
    }
  
    addPhoto(photoUrl) {
      this.photos.push(photoUrl);
    }
  
    getRating() {
      if (this.reviews.length === 0) {
        return 0.0;
      }
      const sum = this.reviews.reduce((total, review) => total + review.rating, 0);
      return sum / this.reviews.length;
    }

    generateRandomId() {
      const randomIdentifier = Math.random().toString(36).substring(2, 8);
      const currentDate = new Date().getTime();
      return `${currentDate}_${randomIdentifier}`;
    }
}
module.exports = Location;