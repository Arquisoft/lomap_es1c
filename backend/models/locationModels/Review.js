class Review {
	constructor(rating, author, id = null) {
		if (!Number.isInteger(rating) || rating < 0 || rating > 10) {
			throw new Error(
				"Invalid rating value. Must be an integer between 0 and 10"
			);
		}
		if (!author || author.trim().length === 0) {
			throw new Error("Review author cannot be null or empty");
		}
		this.id = id ? id : this.generateRandomId();
		this.rating = rating;
		this.author = author;
	}
	generateRandomId() {
		const randomIdentifier = Math.random().toString(36).substring(2, 8);
		const currentDate = new Date().getTime();
		return `${currentDate}_${randomIdentifier}`;
	}
}
module.exports = Review;
