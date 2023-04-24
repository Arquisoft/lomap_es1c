class Request {
	constructor(sender, receiver, id = null) {
		this.sender = sender;
		this.receiver = receiver;
		this.id = id ? id : this.generateRandomId();
	}

	generateRandomId() {
		const randomIdentifier = Math.random().toString(36).substring(2, 8);
		const currentDate = new Date().getTime();
		return `${currentDate}_${randomIdentifier}`;
	}
}

module.exports = Request;
