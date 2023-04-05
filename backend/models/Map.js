class Map {
	constructor(name, id = null, locations = []) {
		this.id = id ? id : this.generateRandomId();
		this.name = name;
		this.locations = locations || [];
	}

	addLocation(location) {
		locations.push(location);
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

module.exports = Map;
