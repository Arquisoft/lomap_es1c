class Friend {
	constructor(name, webId, id = null) {
		this.name = name;
		if (!webId || webId.trim().length === 0) {
			throw new Error("Web ID cannot be null or empty");
		}
		this.webId = webId;
		this.id = id ? id : this.generateRandomId();
	}

	updateName(name) {
		this.name = name;
	}
	generateRandomId() {
		const randomIdentifier = Math.random().toString(36).substring(2, 8);
		const currentDate = new Date().getTime();
		return `${currentDate}_${randomIdentifier}`;
	}
}

export default Friend;
