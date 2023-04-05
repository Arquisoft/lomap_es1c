class Route {
	constructor(name, description, author, id = null, locations = []) {
		if (!name || name.trim().length === 0) {
			throw new Error("Route name cannot be null or empty");
		}
		if (!author || author.trim().length === 0) {
			throw new Error("Route author cannot be null or empty");
		}

		this.id = id ? id : this.generateRandomId();
		this.name = name;
		this.description = description;
		this.locations = locations || [];
		this.author = author;
	}

	addLocation(location) {
		this.locations.push(location);
	}
	changeOrder(location, newPosition) {
		const oldPosition = this.locations.indexOf(location);
		if (oldPosition === -1) {
			throw new Error("Location not found in route");
		}
		this.locations.splice(oldPosition, 1);
		this.locations.splice(newPosition, 0, location);
	}

	generateRandomId() {
		const randomIdentifier = Math.random().toString(36).substring(2, 8);
		const currentDate = new Date().getTime();
		return `${currentDate}_${randomIdentifier}`;
	}
}
module.exports = Route;
