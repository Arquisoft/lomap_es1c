const Friend = require("../models/Friend.js");
const solid = require("../solid/Solid.js");
const SessionController = require("../controllers/util/SessionController.js");

async function getAllFriends(session) {
	try {
		const friends = await solid.getAllFriends(session);
		return friends;
	} catch (err) {
		console.log("error en getAllFriends");
		throw new Error("Ha ocurrido un error al obtener los amigos");
	}
}

async function addFriend(session, friend) {
	try {
		const name = friend.name;
		const webId = friend.webId;
		const friend = new Friend(name, webId);

		await solid.addFriend(session, friend);
		return friend;
	} catch (err) {
		console.log("Error en addFriend");
		throw new Error("Ha ocurrido un error al añadir el amigo");
	}
}

async function deleteFriend(session, idFriend) {
	try {
		await solid.deleteFriendById(session, idFriend);
	} catch (err) {
		console.log("Error en deleteFriend");
		throw new Error("Ha ocurrido un error al eliminar el amigo");
	}
}
//PROBAR
async function getAllLocationsFromFriends(session) {
	try {
		const locations = await solid.getAllLocationsFromFriends(session);
		return locations;
	} catch (err) {
		console.log("Error en getAllLocationsFromFriends");
		throw new Error("Ha ocurrido un error al obtener las localizaciones");
	}
}

//PROBAR
async function getFriendLocations(session, idFriend) {
	try {
		const locations = await solid.getAllLocations(session, idFriend);
		return locations;
	} catch (err) {
		console.log("Error en getFriendLocations");
		throw new Error("Ha ocurrido un error al obtener las localizaciones");
	}
}

async function getAllLocationsByCategory(session, name) {
	try {
		const locations = await solid.getAllLocationsFromFriends(session);
		const locationsByCategory = locations.filter(
			(location) => location.category === name
		);
		return locations;
	} catch (err) {
		console.log("Error en getAllLocationsByCategory");
		throw new Error("Ha ocurrido un error al obtener las localizaciones");
	}
}

async function givePermissions(session, friendId) {
	try {
		await solid.givePermissions(session, friendId);
	} catch (err) {
		console.log("Error en givePermissions");
		throw new Error("Ha ocurrido un error al dar permisos");
	}
}

async function removePermissions(session, friendId) {
	try {
		await solid.removePermissions(session, friendId);
	} catch (err) {
		console.log("Error en removePermissions");
		throw new Error("Ha ocurrido un error al quitar permisos");
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
