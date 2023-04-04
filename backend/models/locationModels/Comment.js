class Comment {
	constructor(author, comment, timestamp = null, id = null) {
		if (!author || author.trim().length === 0) {
			throw new Error("Comment author cannot be null or empty");
		}
		if (!comment || comment.trim().length === 0) {
			throw new Error("Comment text cannot be null or empty");
		}
		this.author = author;
		this.comment = comment;
		this.id = id ? id : this.generateRandomId();
		this.timestamp = timestamp ? timestamp : this.generateTimestamp();
	}

	generateTimestamp() {
		const currentDate = new Date().getTime();
		return `${currentDate}`;
	}

	updateComment(comment) {
		this.comment = comment;
	}

	generateRandomId() {
		const randomIdentifier = Math.random().toString(36).substring(2, 8);
		const currentDate = new Date().getTime();
		return `${currentDate}_${randomIdentifier}`;
	}
}
