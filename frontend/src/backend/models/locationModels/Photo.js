class Photo {
	constructor(author, imageJPG, timestamp = null, id = null) {
		if (!author || author.trim().length === 0) {
			throw new Error("Photo author cannot be null or empty");
		}

		if (!imageJPG || imageJPG.trim().length === 0) {
			throw new Error("Photo cannot be null or empty");
		}

		this.id = id ? id : this.generateRandomId();
		this.timestamp = timestamp ? timestamp : this.generateTimestamp();

		this.author = author;
		this.imageJPG = imageJPG;
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

export default Photo;
