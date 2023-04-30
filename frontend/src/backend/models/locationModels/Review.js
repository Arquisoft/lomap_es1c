class Review {
	constructor(rating, comment, author, id = null) {
		if (!Number.isInteger(rating) || rating > 10) {
			throw new Error(
				"Invalid rating value. Must be an integer smaller than 10"
				);
			}
		if (!author || author.trim().length === 0) {
			throw new Error("Review author cannot be null or empty");
		}
		this.id = id ? id : this.generateRandomId();
		this.rating = rating;
		this.author = author;
		this.comment = comment;
	}
	generateRandomId() {
		const randomIdentifier = Math.random().toString(36).substring(2, 8);
		const currentDate = new Date().getTime();
		return `${currentDate}_${randomIdentifier}`;
	}
}
module.exports = Review;
