import Friend from "../models/Friend.js";
import FriendRequest from "../models/FriendRequest.js";
import {
	deleteFriendById,
	getAllLocations as getAllLocations_,
	getLocationById as getLocationById_,
	mandarSolicitud,
	getAllSolicitudes,
	aceptarSolicitud,
	denegarSolicitud,
	getAllFriends as getAllFriends_
} from "../solid/Solid.js";

//Amigos

async function getAllFriends(session) {
	try {
		const friends = await getAllFriends_(session);
		return friends;
	} catch (err) {
		throw new Error("Ha ocurrido un error al obtener los amigos");
	}
}

async function deleteFriend(session, idFriend) {
	try {
		await deleteFriendById(session, idFriend);
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
		const locations = await getAllLocations_(session, webIdAmigo);
		return locations;
	} catch (err) {
		throw new Error("Ha ocurrido un error al obtener las localizaciones");
	}
}

async function getFriendLocationById(session, webidAmigo, idLocation) {
	try {
		const location = await getLocationById_(
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
		await mandarSolicitud(session, friendRequest, name);
		return true;
	} catch (err) {
		throw new Error("Ha ocurrido un error al enviar la solicitud");
	}
}

async function getAllRequests(session) {
	try {
		const solicitudes = await getAllSolicitudes(session);
		return solicitudes;
	} catch (err) {
		throw new Error("Ha ocurrido un error al obtener las solicitudes");
	}
}

async function acceptRequest(session, webId, name) {
	try {
		const friend = new Friend(name, webId);
		await aceptarSolicitud(session, friend);
		return true;
	} catch (err) {
		throw new Error("Ha ocurrido un error al aceptar la solicitud");
	}
}

async function rejectRequest(session, webId) {
	try {
		await denegarSolicitud(session, webId);
		return true;
	} catch (err) {
		throw new Error("Ha ocurrido un error al rechazar la solicitud");
	}
}

export {
	getAllFriends,
	deleteFriend,
	getFriendLocations,
	sendFriendRequest,
	getAllRequests,
	acceptRequest,
	rejectRequest,
	getFriendLocationById,
};
