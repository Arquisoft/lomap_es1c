import {parseContainer, parseSolicitud, parseFriend} from "./util/Parser.js";
import {serializeSolicitud, serializeContenedor, saveJsonLD, serializeFriend, deleteThing} from "./util/Serializer.js";
import Friend from "../models/Friend.js";

const {
	getFile,
	universalAccess,
	getPodUrlAll,
} = require("@inrupt/solid-client");

async function mandarSolicitud(Session, myBaseUrl, solicitud, nameFriend) {
	let friendUrl = await getPodUrlAll(solicitud.receiver, {
		fetch: Session.fetch,
	});
	friendUrl = friendUrl[0];

	let jsonSolicitud = await serializeSolicitud(solicitud);

	await serializeContenedor(
		Session,
		friendUrl + "public/solicitudes.jsonld",
		jsonSolicitud
	);

	let modelFriend = new Friend(nameFriend, solicitud.receiver);
	await addFriend(Session, myBaseUrl, modelFriend);
}

async function aceptarSolicitud(Session, myBaseUrl, friend) {
	//Se eliminan la solicitud
	let solicitudes = await getAllSolicitudes(Session, myBaseUrl);
	solicitudes
		.filter((s) => s.sender === friend.webId)
		.map((s) => denegarSolicitud(Session, myBaseUrl, s.sender));

	//Se añade a amigos
	await addFriend(Session, myBaseUrl, friend);
}

async function denegarSolicitud(Session, myBaseUrl, friendwebId) {
	let jsonContainer = await parseContainer(
		Session,
		myBaseUrl + "public/solicitudes.jsonld"
	);

	jsonContainer.itemListElement = jsonContainer.itemListElement.filter(
		(t) => t.sender !== friendwebId
	);

	await saveJsonLD(
		Session,
		myBaseUrl + "public/solicitudes.jsonld",
		jsonContainer
	);
}

async function addFriend(Session, myBaseUrl, friend) {
	darPermisos(Session, friend.webId, myBaseUrl + "LoMap/locations", {
		read: true,
		write: true,
	});
	darPermisos(
		Session,
		friend.webId,
		myBaseUrl + "LoMap/locations/locations.jsonld",
		{
			read: true,
			write: true,
		}
	);
	darPermisos(
		Session,
		friend.webId,
		myBaseUrl + "LoMap/locations/reviews.jsonld",
		{
			read: true,
		}
	);
	darPermisos(
		Session,
		friend.webId,
		myBaseUrl + "LoMap/locations/photos.jsonld",
		{
			read: true,
		}
	);
	darPermisos(Session, friend.webId, myBaseUrl + "LoMap/routes.jsonld", {
		read: true,
	});
	darPermisos(Session, friend.webId, myBaseUrl + "LoMap/friends.jsonld", {
		read: true,
	});

	let jsonLDFriend = await serializeFriend(friend);


	let jsonContainer = await parseContainer(Session, myBaseUrl + "LoMap/friends.jsonld");


	jsonContainer.itemListElement = jsonContainer.itemListElement.filter(
		(t) => t.webId !== friend.webId
	);

	jsonContainer.itemListElement.push(jsonLDFriend);

	await saveJsonLD(
		Session,
		myBaseUrl + "LoMap/friends.jsonld",
		jsonContainer
	);
}

async function getAllSolicitudes(Session, myBaseUrl) {
	let solicitudesJson = await parseContainer(
		Session,
		myBaseUrl + "public/solicitudes.jsonld"
	);

	solicitudesJson.itemListElement = solicitudesJson.itemListElement.map((l) =>
		parseSolicitud(l)
	);
	return solicitudesJson.itemListElement;
}

async function getAllFriends(Session, myBaseUrl) {
	let friendsJson = await parseContainer(
		Session,
		myBaseUrl + "LoMap/friends.jsonld"
	);

	let friends = friendsJson.itemListElement.map((f) => isFriend(Session, f));

	for (let i = 0; i < friends.length; i++) {
		friends[i] = await friends[i];
	}

	return friends.filter((f) => f !== null).map((f) => parseFriend(f));
}

async function getFriendById(Session, idFriend, myBaseUrl) {
	let friends = (
		await parseContainer(Session, myBaseUrl + "LoMap/friends.jsonld")
	).itemListElement;
	return parseFriend(friends.find((f) => f.webId === idFriend));
}

async function deleteFriendById(Session, idFriend, myBaseUrl) {
	let friend = await getFriendById(Session, idFriend, myBaseUrl);
	idFriend = friend.id;

	await deleteThing(
		Session,
		myBaseUrl + "LoMap/friends.jsonld",
		idFriend
	);
	darPermisos(
		Session,
		friend.webId,
		myBaseUrl + "LoMap/locations/locations.jsonld",
		{
			read: false,
			write: false,
			append: false,
			controlRead: false,
			controlWrite: false,
		}
	);
	darPermisos(
		Session,
		friend.webId,
		myBaseUrl + "LoMap/locations/reviews.jsonld",
		{
			read: false,
			write: false,
			append: false,
			controlRead: false,
			controlWrite: false,
		}
	);
	darPermisos(
		Session,
		friend.webId,
		myBaseUrl + "LoMap/locations/photos.jsonld",
		{
			read: false,
			write: false,
			append: false,
			controlRead: false,
			controlWrite: false,
		}
	);
	darPermisos(Session, friend.webId, myBaseUrl + "LoMap/routes.jsonld", {
		read: false,
		write: false,
		append: false,
		controlRead: false,
		controlWrite: false,
	});
	darPermisos(Session, friend.webId, myBaseUrl + "LoMap/friends.jsonld", {
		read: false,
		write: false,
		append: false,
		controlRead: false,
		controlWrite: false,
	});
}

async function isFriend(Session, friend) {
	try {
		let myBaseUrl = await getPodUrlAll(friend.webId, { fetch: Session.fetch });
		myBaseUrl = myBaseUrl[0];
		await getFile(myBaseUrl + "LoMap/friends.jsonld", { fetch: Session.fetch });
		return friend;
	} catch (err) {
		return null;
	}
}

//Solo da permiso a la carpetaUrl pero no a las carpetas o recursos hijos
async function darPermisos(Session, webId, carpetaUrl, permisos) {
	await universalAccess.setAgentAccess(carpetaUrl, webId, permisos, {
		fetch: Session.fetch,
	});
}

async function darPermisosPublicos(Session, carpetaUrl, permisos) {
	await universalAccess.setPublicAccess(carpetaUrl, permisos, {
		fetch: Session.fetch,
	});
}

export {
	addFriend,
	getAllFriends,
	deleteFriendById,
	getFriendById,
	darPermisosPublicos,
	getAllSolicitudes,
	mandarSolicitud,
	aceptarSolicitud,
	denegarSolicitud,
};
