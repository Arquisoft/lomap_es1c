class Review {
	constructor(rating, comment, author, id = null) {
		console.log(rating)
		if (!Number.isInteger(rating) || rating > 10) {
			throw new Error(
				"Invalid rating value. Must be an integer smaller than 10"
				);
			}
		console.log("22")
		if (!author || author.trim().length === 0) {
			throw new Error("Review author cannot be null or empty");
		}
		console.log("33")
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
