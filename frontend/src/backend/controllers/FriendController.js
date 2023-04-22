const Friend = require("../models/Friend.js");
const FriendRequest = require("../models/FriendRequest.js");
const solid = require("../solid/Solid.js");

//Amigos

async function getAllFriends(session) {
	try {
		const friends = await solid.getAllFriends(session);
		return friends;
	} catch (err) {
		console.log("error en getAllFriends");
		throw new Error("Ha ocurrido un error al obtener los amigos");
	}
}

async function addFriend(session, friendData) {
	try {
		const name = friendData.name;
		const webId = friendData.webId;
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

async function getAllLocationsFromFriends(session) {
	try {
		const locations = await solid.getAllLocationsFromFriends(session);
		return locations;
	} catch (err) {
		console.log("Error en getAllLocationsFromFriends");
		throw new Error("Ha ocurrido un error al obtener las localizaciones");
	}
}

async function getFriendLocations(session, webIdAmigo) {
	try {
		const locations = await solid.getAllLocations(session, webIdAmigo);
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

//Solicitudes
async function sendFriendRequest(session, newFriend) {
	const name = newFriend.name;
	const webIdAmigo = newFriend.webId;
	try {
		const friendRequest = new FriendRequest(session.info.webId, webIdAmigo);
		await solid.sendFriendRequest(session, friendRequest, name);
		return true;
	} catch (err) {
		console.log("Error en sendFriendRequest");
		throw new Error("Ha ocurrido un error al enviar la solicitud");
	}
}

async function getAllRequests(session) {
	try {
		const solicitudes = await solid.getAllSolicitudes(session);
		return solicitudes;
	} catch (err) {
		console.log("Error en getAllSolicitudes");
		throw new Error("Ha ocurrido un error al obtener las solicitudes");
	}
}

async function acceptRequest(session, webId) {
	try {
		await solid.acceptRequest(session, webId);
		return true;
	} catch (err) {
		console.log("Error en acceptRequest");
		throw new Error("Ha ocurrido un error al aceptar la solicitud");
	}
}

async function rejectRequest(session, webId) {
	try {
		await solid.rejectRequest(session, webId);
		return true;
	} catch (err) {
		console.log("Error en rejectRequest");
		throw new Error("Ha ocurrido un error al rechazar la solicitud");
	}
}

module.exports = {
	getAllFriends,
	deleteFriend,
	addFriend,
	getAllLocationsFromFriends,
	getFriendLocations,
	getAllLocationsByCategory,
	sendFriendRequest,
	getAllRequests,
	acceptRequest,
	rejectRequest,
};
