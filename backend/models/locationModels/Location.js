class Location {
	constructor(
		name,
		latitude,
		longitude,
		description,
		author,
		category = null,
		id = null,
		timestamp = null,
		comments = [],
		reviews = [],
		photos = []
	) {
		if (!name || name.trim().length === 0) {
			throw new Error("Location name cannot be null or empty");
		}

		if (isNaN(latitude) || isNaN(longitude)) {
			throw new Error("Location latitude and longitude must be numbers");
		}
		if (!author || author.trim().length === 0) {
			throw new Error("Location author cannot be null or empty");
		}

		this.id = id ? id : this.generateRandomId();
		this.name = name;
		this.category = category;
		this.latitude = latitude;
		this.longitude = longitude;
		this.description = description;
		this.comments = comments || [];
		this.reviews = reviews || [];
		this.photos = photos || [];
		this.timestamp = timestamp ? timestamp : this.generateTimestamp();
		this.author = author;
	}

	addComment(comment) {
		if (comment == null) {
			throw new Error("Comment is null");
		}
		this.comments.push(comment);
	}

	getRating() {
		if (this.reviews.length === 0) {
			return 0.0;
		}
		const sum = this.reviews.reduce(
			(total, review) => total + review.rating,
			0
		);
		return sum / this.reviews.length;
	}

	//Reviews
	addReview(review) {
		if (review == null) {
			throw new Error("Review is null");
		}
		this.reviews.push(review);
	}
	//Comments
	addComment(comment) {
		if (comment == null) {
			throw new Error("Comment is null");
		}
		this.comments.push(comment);
	}
	//Photos
	addPhoto(photoUrl) {
		if (photoUrl == null) {
			throw new Error("PhotoUrl is null");
		}
		this.photos.push(photoUrl);
	}
	//Generate
	generateRandomId() {
		const randomIdentifier = Math.random().toString(36).substring(2, 8);
		const currentDate = new Date().getTime();
		return `${currentDate}_${randomIdentifier}`;
	}
	generateTimestamp() {
		const currentDate = new Date().getTime();
		return `${currentDate}`;
	}
}
module.exports = Location;
