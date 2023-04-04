class Friend {
	constructor(name, webid) {
		this.name = name;
		if (!webid || webid.trim().length === 0) {
			throw new Error("Web ID cannot be null or empty");
		}
		this.webid = webid;
	}

	updateName(name) {
		this.name = name;
	}
}

module.exports = Friend;
