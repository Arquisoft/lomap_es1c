class Location {
	constructor(
		name,
		latitude,
		longitude,
		author,
		category = null,
		id = null,
		timestamp = null,
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
		this.reviews = reviews || [];
		this.photos = photos || [];
		this.timestamp = timestamp ? timestamp : this.generateTimestamp();
		this.author = author;
	}

	addReview(review){
		this.reviews.push(review);
	}

	addPhoto(photo){
		this.photos.push(photo);
	}

	changePrivacy(privacy) {
		if (!privacy || privacy.trim().length === 0) {
			throw new Error("Location privacy cannot be null or empty");
		}
		if (
			privacy !== "public" &&
			privacy !== "friends" &&
			privacy !== "private"
		) {
			throw new Error("Location privacy must be public, friends or private");
		}
		this.privacy = privacy;
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
