const solid = require("../solid/Solid.js");
const Friend = require("../models/Friend.js");

async function getAllFriends(req, res) {
	const friends = await solid.getAllFriends();
	res.send(JSON.stringify(friends));
}

async function deleteFriend(req, res) {
	const { id } = req.params;
	const friend = await solid.getFriendById(id);
	if (friend != null) {
		await solid.deleteFriend(friend);
		res.status(200).json(friend);
	} else {
		res.status(404).json("No se han encontrado amigos con esa id");
	}
}

async function addFriend(req, res) {
	const { name, webid } = req.body;
	if (!name || !webid) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	const friend = new Friend(name, webid);
	await solid.saveFriend(friend);
	res.status(201).json(friend);
}

async function getAllLocationsFromFriends(req, res) {
	const locations = await solid.getAllLocationsFromFriends();
	res.send(JSON.stringify(locations));
}

async function getFriendLocations(req, res) {
	const { id } = req.params;
	const locations = await solid.getFriendLocations(id);
	res.send(JSON.stringify(locations));
}

async function getAllLocationsByCategory(req, res) {
	const { name } = req.params;
	const locations = await solid.getAllLocationsFromFriends();
	const locationsByCategory = locations.filter(
		(location) => location.category === name
	);
	res.send(JSON.stringify(locationsByCategory));
}

module.exports = {
	getAllFriends,
	deleteFriend,
	addFriend,
	getAllLocationsFromFriends,
	getFriendLocations,
	getAllLocationsByCategory,
};
