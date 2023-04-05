const { getSessionFromStorage } = require("@inrupt/solid-client-authn-node");

const Location = require("../models/locationModels/Location");
const Photo = require("../models/locationModels/Photo");
const Review = require("../models/locationModels/Review");
const Comment = require("../models/locationModels/Comment");
const session = require("./util/sessionController");
const solid = require("../solid/Solid.js");

//CRUD

async function getLocation(req, res) {
	const { id } = req.params;
	const location1 = await solid.getLocationById(
		session.getSession().getSession(),
		id,
		req.session.user
	);
	if (location1 != null) {
		res.send(JSON.stringify(location1));
	} else {
		res.status(404).json("No se han encontrado localizaciones con esa id");
	}
}

async function getAllLocations(req, res) {
	const locations = await solid.getAllLocations(
		session.getSession().getSession(),
		req.session.user
	);
	res.send(JSON.stringify(locations));
}

async function createLocation(req, res) {
	const { name, latitude, longitude, description, category } = req.body;

	if (!name || !description || !latitude || !longitude) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}

	const location = new Location(
		name,
		latitude,
		longitude,
		description,
		req.session.user,
		category
	);
	await solid.saveLocation(session.getSession(), location, req.session.user);
	res.status(201).json(location);
}

async function updateLocation(req, res) {
	const { id } = req.params;
	const { name, latitude, longitude, description, category } = req.body;

	if (!name && !latitude && !longitude && !description) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	let location = await solid.getLocationById(id);
	location.name = name;
	location.latitude = latitude;
	location.longitude = longitude;
	location.description = description;
	location.category = category;

	await solid.saveLocation(session.getSession(), location, req.session.user);
	res.status(200).json(location);
}

async function deleteLocation(req, res) {
	const { id } = req.params;
	const location = await solid.getLocationById(
		session.getSession(),
		id,
		req.session.user
	);
	if (location != null) {
		await solid.deleteLocationById(session.getSession(), id, req.session.user);
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

	let location = await solid.getLocationById(
		session.getSession(),
		id,
		req.session.user
	);
	const photo = new Photo(req.session.user, name, photoUrl);
	location.addPhoto(photo);
	await solid.saveLocation(location);
	res.status(201).json({ message: "Photo added successfully" });
}

async function deletePhoto(req, res) {
	const { id } = req.params;
	const { idPhoto } = req.body;
	await solid.deletePhoto(id, idPhoto);
	res.status(204).json({ message: "Photo removed successfully" });
}

async function addReview(req, res) {
	const { id } = req.params;
	const { rating } = req.body;

	if (!rating) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	let location = await solid.getLocationById(
		session.getSession(),
		id,
		req.session.user
	);
	const review = new Review(rating, req.session.user);

	location.addReview(review);
	await solid.saveLocation(location);
	res.status(201).json({ message: "Photo added successfully" });
}

async function deleteReview(req, res) {
	const { id } = req.params;
	const { idReview } = req.body;
	await solid.deleteComment(id, idReview);
	res.status(204).json({ message: "Review removed successfully" });
}

async function addComment(req, res) {
	const { id } = req.params;
	const { text } = req.body;

	if (!comment) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	let location = await solid.getLocationById(
		session.getSession(),
		id,
		req.session.user
	);
	const comment = new Comment(req.session.user, text);
	location.addComment(commentObject);
	await solid.saveLocation(location);
	res.status(201).json({ message: "Comment added successfully" });
}

async function deleteComment(req, res) {
	const { id } = req.params;
	const { idComment } = req.body;
	await solid.deleteComment(id, idComment);
	res.status(204).json({ message: "Comment removed successfully" });
}

//  Categories
async function getCategories(req, res) {
	let categories = await solid.getCategories();
	res.send(JSON.stringify(categories));
}

async function getLocationsByCategory(req, res) {
	const { category } = req.params;
	let locations = await solid.getAllLocations(
		session.getSession(),
		req.session.user
	);
	locations = locations.filter((location) => location.category === category);
	res.send(JSON.stringify(locations));
}

module.exports = {
	createLocation,
	getAllLocations,
	getLocation,
	deleteLocation,
	updateLocation,
	addReview,
	addPhoto,
	getCategories,
	addComment,
	getLocationsByCategory,
	deletePhoto,
	deleteReview,
	deleteComment,
};
