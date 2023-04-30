const Friend = require("../models/Friend.js");
const FriendRequest = require("../models/FriendRequest.js");
const solid = require("../solid/Solid.js");

//Amigos

async function getAllFriends(session) {
	try {
		const friends = await solid.getAllFriends(session);
		return friends;
	} catch (err) {
		throw new Error("Ha ocurrido un error al obtener los amigos");
	}
}

async function deleteFriend(session, idFriend) {
	try {
		await solid.deleteFriendById(session, idFriend);
		return true;
	} catch (err) {
		throw new Error("Ha ocurrido un error al eliminar el amigo");
	}
}
/*
async function getAllLocationsFromFriends(session) {
	try {
		const locations = await solid.getAllLocationsFromFriends(session);
		return locations;
	} catch (err) {
		throw new Error("Ha ocurrido un error al obtener las localizaciones");
	}
}
*/
async function getFriendLocations(session, webIdAmigo) {
	try {
		const locations = await solid.getAllLocations(session, webIdAmigo);
		return locations;
	} catch (err) {
		throw new Error("Ha ocurrido un error al obtener las localizaciones");
	}
}

async function getFriendLocationById(session, webidAmigo, idLocation) {
	try {
		const location = await solid.getLocationById(
			session,
			idLocation,
			webidAmigo
		);
		return location;
	} catch (err) {
		throw new Error("Ha ocurrido un error al obtener la localizacion");
	}
}

//Solicitudes
async function sendFriendRequest(session, newFriend) {
	const name = newFriend.name;
	const webIdAmigo = newFriend.webId;
	try {
		const friendRequest = new FriendRequest(session.info.webId, webIdAmigo);
		await solid.mandarSolicitud(session, friendRequest, name);
		return true;
	} catch (err) {
		throw new Error("Ha ocurrido un error al enviar la solicitud");
	}
}

async function getAllRequests(session) {
	try {
		const solicitudes = await solid.getAllSolicitudes(session);
		return solicitudes;
	} catch (err) {
		throw new Error("Ha ocurrido un error al obtener las solicitudes");
	}
}

async function acceptRequest(session, webId, name) {
	try {
		const friend = new Friend(name, webId);
		await solid.aceptarSolicitud(session, friend);
		return true;
	} catch (err) {
		throw new Error("Ha ocurrido un error al aceptar la solicitud");
	}
}

async function rejectRequest(session, webId) {
	try {
		await solid.denegarSolicitud(session, webId);
		return true;
	} catch (err) {
		throw new Error("Ha ocurrido un error al rechazar la solicitud");
	}
}

module.exports = {
	getAllFriends,
	deleteFriend,
	getFriendLocations,
	sendFriendRequest,
	getAllRequests,
	acceptRequest,
	rejectRequest,
	getFriendLocationById,
};
