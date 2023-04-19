/*
const Friend = require("../models/Friend.js");
const solid = require("../solid/Solid.js");
const SessionController = require("../controllers/util/SessionController.js");

async function getAllFriends(req, res, next) {
	try {
		const session = await SessionController.getSession(req, next);
		const friends = await solid.getAllFriends(session);
		res.status(200).json(friends);
	} catch (err) {
		next(err);
	}
}

async function addFriend(req, res, next) {
	try {
		const { name, webId } = req.body;
		if (!name || !webId) {
			res.status(400).json({ error: "Faltan datos" });
			return;
		}
		const session = await SessionController.getSession(req, next);
		const friend = new Friend(name, webId);

		await solid.addFriend(session, friend);
		res.status(201).json(friend);
	} catch (err) {
		next(err);
	}
}

async function deleteFriend(req, res, next) {
	try {
		const { id } = req.params;

		const session = await SessionController.getSession(req, next);
		await solid.deleteFriendById(session, id);
		res.status(200).json(id);
	} catch (err) {
		next(err);
	}
}
//PROBAR
async function getAllLocationsFromFriends(req, res, next) {
	try {
		const session = await SessionController.getSession(req, next);
		const locations = await solid.getAllLocationsFromFriends(session);
		res.status(200).json(JSON.stringify(locations));
	} catch (err) {
		next(err);
	}
}

//PROBAR
async function getFriendLocations(req, res, next) {
	try {
		const { id } = req.params;
		const session = await SessionController.getSession(req, next);
		const locations = await solid.getAllLocations(session, id);
		res.status(200).send(JSON.stringify(locations));
	} catch (err) {
		next(err);
	}
}

async function getAllLocationsByCategory(req, res, next) {
	try {
		const { name } = req.params;
		const session = await SessionController.getSession(req, next);
		const locations = await solid.getAllLocationsFromFriends(session);
		const locationsByCategory = locations.filter(
			(location) => location.category === name
		);
		res.status(200).send(JSON.stringify(locationsByCategory));
	} catch (err) {
		next(err);
	}
}
/*
async function givePermissions(req, res, next) {
	try {
		const { friendId } = req.params;
		await SolidFriends.givePermissions(Session, friendId);
	} catch (err) {
		next(err);
	}
}
async function removePermissions(req, res, next) {
	try {
		const { friendId } = req.params;
		await SolidFriends.removePermissions(Session, friendId);
	} catch (err) {
		next(err);
	}
}

module.exports = {
	getAllFriends,
	deleteFriend,
	addFriend,
	getAllLocationsFromFriends,
	getFriendLocations,
	getAllLocationsByCategory,
};
*/
