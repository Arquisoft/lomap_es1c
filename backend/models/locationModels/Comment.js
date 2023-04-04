class Comment {
	constructor(author, text, timestamp = null, id = null) {
		if (!author || author.trim().length === 0) {
			throw new Error("Comment author cannot be null or empty");
		}
		if (!text || comment.trim().length === 0) {
			throw new Error("Comment text cannot be null or empty");
		}
		this.author = author;
		this.text = text;
		this.id = id ? id : this.generateRandomId();
		this.timestamp = timestamp ? timestamp : this.generateTimestamp();
	}

	generateTimestamp() {
		const currentDate = new Date().getTime();
		return `${currentDate}`;
	}

	updateText(text) {
		this.text = text;
	}

	generateRandomId() {
		const randomIdentifier = Math.random().toString(36).substring(2, 8);
		const currentDate = new Date().getTime();
		return `${currentDate}_${randomIdentifier}`;
	}
}
