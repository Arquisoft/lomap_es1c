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

async function deleteFriend(session, idFriend) {
	try {
		console.log("idFriend: " + idFriend);
		await solid.deleteFriendById(session, idFriend);
		return true;
	} catch (err) {
		console.log(err);
		console.log("Error en deleteFriend");
		throw new Error("Ha ocurrido un error al eliminar el amigo");
	}
}

//TODO
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
		await solid.mandarSolicitud(session, friendRequest, name);
		return true;
	} catch (err) {
		console.log(err);
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
		const friend = new Friend("Nombre:" + webId, webId);
		await solid.aceptarSolicitud(session, friend);
		return true;
	} catch (err) {
		console.log("Error en acceptRequest");
		throw new Error("Ha ocurrido un error al aceptar la solicitud");
	}
}

async function rejectRequest(session, webId) {
	try {
		await solid.denegarSolicitud(session, webId);
		return true;
	} catch (err) {
		console.log("Error en rejectRequest");
		throw new Error("Ha ocurrido un error al rechazar la solicitud");
	}
}

module.exports = {
	getAllFriends,
	deleteFriend,
	getAllLocationsFromFriends,
	getFriendLocations,
	getAllLocationsByCategory,
	sendFriendRequest,
	getAllRequests,
	acceptRequest,
	rejectRequest,
};
