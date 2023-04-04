class Photo {
	constructor(author, name, url, timestamp = null, id = null) {
		if (!author || author.trim().length === 0) {
			throw new Error("Photo author cannot be null or empty");
		}

		if (!name || name.trim().length === 0) {
			throw new Error("Photo name cannot be null or empty");
		}

		if (!url || url.trim().length === 0) {
			throw new Error("Photo url cannot be null or empty");
		}

		this.id = id ? id : this.generateRandomId();
		this.timestamp = timestamp ? timestamp : this.generateTimestamp();

		this.author = author;
		this.name = name;
		this.url = url;
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
