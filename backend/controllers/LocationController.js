const { getSessionFromStorage } = require("@inrupt/solid-client-authn-node");

const Location = require("../models/locationModels/Location");
const Photo = require("../models/locationModels/Photo");
const Review = require("../models/locationModels/Review");
const Comment = require("../models/locationModels/Comment");
const solid = require("../solid/SolidPrueba.js");

//CRUD

async function getLocation(req, res) {
	const { id } = req.params;

	const location1 = await solid.getLocationById(id);
	if (location1 != null) {
		res.send(JSON.stringify(location1));
	} else {
		res.status(404).json("No se han encontrado localizaciones con esa id");
	}
}

async function getAllLocations(req, res) {
	session = await getSessionFromStorage(req.session.sessionId);
	const locations = await solid.getAllLocations(session);
	res.send(JSON.stringify(locations));
}

async function createLocation(req, res) {
	const { name, latitude, longitude, description, category } = req.body;

	if (!name || !description || !latitude || !longitude) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	session = await getSessionFromStorage(req.session.sessionId);
	const location = new Location(
		name,
		latitude,
		longitude,
		description,
		req.session.user,
		category
	);
	await solid.saveLocation(session, location);
	res.status(201).json(location);
}

async function updateLocation(req, res) {
	const { id } = req.params;
	const { name, latitude, longitude, description, category } = req.body;

	if (!name && !latitude && !longitude && !description) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	const location = await solid.getLocationById(id);
	location.name = name;
	location.latitude = latitude;
	location.longitude = longitude;
	location.description = description;
	location.category = category;

	await solid.saveLocation(location);
	res.status(200).json(location);
}

async function deleteLocation(req, res) {
	const { id } = req.params;
	const location = await solid.getLocationById(id);
	if (location != null) {
		await solid.deleteLocationById(id);
	} else {
		res.status(404).json("No se han encontrado localizaciones con esa id");
		return;
	}
	res.status(204).json({ message: "Location deleted successfully" });
}

//PHOTOS REVIEWS COMMENTS
async function addPhoto(req, res) {
	const { id } = req.params;
	const { name, photoUrl } = req.body;

	if (!photoUrl || !name) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}

	const photo = new Photo(req.session.user, name, photoUrl);
	const location = await solid.getLocationById(id);
	location.addPhoto(photo);
	await solid.saveLocation(location);
	res.status(201).json({ message: "Photo added successfully" });
}

async function removePhoto(req, res) {
	const { id } = req.params;
	const { idPhoto } = req.body;
	await solid.removePhoto(id, idPhoto);
	res.status(204).json({ message: "Photo removed successfully" });
}

async function addReview(req, res) {
	const { id } = req.params;
	const { rating } = req.body;

	if (!rating) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	const review = new Review(rating, req.session.user);
	const location = await solid.getLocationById(id);
	location.addReview(review);
	await solid.saveLocation(location);
	res.status(201).json({ message: "Photo added successfully" });
}

async function removeReview(req, res) {
	const { id } = req.params;
	const { idReview } = req.body;
	await solid.removeComment(id, idReview);
	res.status(204).json({ message: "Review removed successfully" });
}

async function removeComment(req, res) {
	const { id } = req.params;
	const { idComment } = req.body;
	await solid.removeComment(id, idComment);
	res.status(204).json({ message: "Comment removed successfully" });
}

async function addComment(req, res) {
	const { id } = req.params;
	const { text } = req.body;

	if (!comment) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	const comment = new Comment(req.session.user, text);
	const location = await solid.getLocationById(id);
	location.addComment(commentObject);
	await solid.saveLocation(location);
	res.status(201).json({ message: "Comment added successfully" });
}

//  Categories
async function getCategories(req, res) {
	let categories = await solid.getCategories();
	res.send(JSON.stringify(categories));
}

async function getLocationsByCategory(req, res) {
	const { category } = req.params;
	let locations = await solid.getAllLocations();
	locations = locations.filter((location) => location.category === category);
	res.send(JSON.stringify(locations));
}

module.exports = {
	createLocation,
	getAllLocations,
	getLocation,
	deleteLocation,
	updateLocation,
	addPhoto,
	getCategories,
	setRating,
	addComment,
	getLocationsByCategory,
	removePhoto,
	removeReview,
	removeComment,
};
