const Location = require("../models/locationModels/Location");
const Photo = require("../models/locationModels/Photo");
const Review = require("../models/locationModels/Review");
const Comment = require("../models/locationModels/Comment");
const SessionController = require("./util/sessionController");
const solid = require("../solid/Solid.js");

//CRUD

async function getLocation(req, res) {
	const { id } = req.params;
	try {
		const session = await SessionController.getSession(req, next);
		const location1 = await solid.getLocationById(
			session,
			id,
			req.session.user
		);
		if (location1 != null) {
			res.send(JSON.stringify(location1));
		} else {
			res.status(404).json("No se han encontrado localizaciones con esa id");
		}
	} catch (err) {
		next(err);
	}
}

async function getAllLocations(req, res, next) {
	try {
		const session = await SessionController.getSession(req, next);
		const locations = await solid.getAllLocations(session, session.info.webId);
		res.send(JSON.stringify(locations));
	} catch (err) {
		next(err);
	}
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

	try {
		const session = await SessionController.getSession(req, next);
		await solid.saveLocation(session, location, req.session.user);
		res.status(201).json(location);
	} catch (err) {
		next(err);
	}
}

async function updateLocation(req, res) {
	const { id } = req.params;
	const { name, latitude, longitude, description, category } = req.body;

	let location = await solid.getLocationById(
		session.getSession(),
		id,
		req.session.user
	);
	location.name = name || location.name;
	location.latitude = latitude || location.latitude;
	location.longitude = longitude || location.longitude;
	location.description = description || location.description;
	location.category = category || location.category;
	try {
		const session = await SessionController.getSession(req, next);
		await solid.saveLocation(session.getSession(), location, req.session.user);
		res.status(200).json(location);
	} catch (err) {
		next(err);
	}
}

async function deleteLocation(req, res) {
	const { id } = req.params;
	try {
		const session = await SessionController.getSession(req, next);
		const location = await solid.getLocationById(session, id, req.session.user);
		if (location != null) {
			await solid.deleteLocationById(session, id, req.session.user);
		} else {
			res.status(404).json("No se han encontrado localizaciones con esa id");
			return;
		}
		res.status(204).json({ message: "Location deleted successfully" });
	} catch (err) {
		next(err);
	}
}

//PHOTOS REVIEWS COMMENTS
async function addPhoto(req, res) {
	const { id } = req.params;
	const { name, photoUrl } = req.body;

	if (!photoUrl || !name) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	try {
		const session = await SessionController.getSession(req, next);
		let location = await solid.getLocationById(session, id, req.session.user);
		const photo = new Photo(req.session.user, name, photoUrl);
		location.addPhoto(photo);
		await solid.saveLocation(location);
		res.status(201).json({ message: "Photo added successfully" });
	} catch (err) {
		next(err);
	}
}

async function deletePhoto(req, res) {
	const { id } = req.params;
	const { idPhoto } = req.body;
	try {
		const session = await SessionController.getSession(req, next);
		await solid.deletePhoto(id, idPhoto);
		res.status(204).json({ message: "Photo removed successfully" });
	} catch (err) {
		next(err);
	}
}

async function addReview(req, res) {
	const { id } = req.params;
	const { rating } = req.body;

	if (!rating) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	try {
		const session = await SessionController.getSession(req, next);
		let location = await solid.getLocationById(session, id, req.session.user);
		const review = new Review(rating, req.session.user);

		location.addReview(review);
		await solid.saveLocation(location);
		res.status(201).json({ message: "Photo added successfully" });
	} catch (err) {
		next(err);
	}
}

async function deleteReview(req, res) {
	const { id } = req.params;
	const { idReview } = req.body;
	if (!idReview) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	try {
		const session = await SessionController.getSession(req, next);
		await solid.deleteComment(id, idReview);
		res.status(204).json({ message: "Review removed successfully" });
	} catch (err) {
		next(err);
	}
}

async function addComment(req, res) {
	const { id } = req.params;
	const { text } = req.body;

	if (!text) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	try {
		const session = await SessionController.getSession(req, next);
		let location = await solid.getLocationById(session, id, req.session.user);
		const comment = new Comment(req.session.user, text);
		location.addComment(commentObject);
		await solid.saveLocation(location);
		res.status(201).json({ message: "Comment added successfully" });
	} catch (err) {
		next(err);
	}
}

async function deleteComment(req, res, next) {
	const { id } = req.params;
	const { idComment } = req.body;
	try {
		const session = await SessionController.getSession(req, next);
		await solid.deleteComment(id, idComment);
		res.status(204).json({ message: "Comment removed successfully" });
	} catch (err) {
		next(err);
	}
}

//  Categories
async function getCategories(req, res, next) {
	try {
		const session = await SessionController.getSession(req, next);
		console.log(session);
		let categories = await solid.getCategories();
		res.send(JSON.stringify(categories));
	} catch (err) {
		next(err);
	}
}

async function getLocationsByCategory(req, res, next) {
	const { category } = req.params;
	try {
		const session = await SessionController.getSession(req, next);
		let locations = await solid.getAllLocations(
			session.getSession(),
			req.session.user
		);
		locations = locations.filter((location) => location.category === category);
		res.send(JSON.stringify(locations));
	} catch (err) {
		next(err);
	}
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
