const {
	getSolidDataset,
	overwriteFile,
	getFile,
	getContainedResourceUrlAll,
	deleteFile,
	FOAF,
	VCARD,
	AccessControlList,
	setPublicAccess,
	setAgentAccess,
} = require("@inrupt/solid-client");

const parser = require("./util/Parser.js");
const serializer = require("./util/Serializer.js");

async function addFriend(Session, myBaseUrl, friend) {
	let file = await serializer.serializeFriend(friend);

	await overwriteFile(
		myBaseUrl + "/LoMap/friends/" + friend.id + ".json",
		file,
		{fetch: Session.fetch,}
	);

	/*darPermisos(Session, friend.webId, myBaseUrl + "LoMap/locations/locations", {
		read: true,
		write: true,
	});
	darPermisos(Session, friend.webId, myBaseUrl + "LoMap/locations/reviews", {
		read: true,
	});
	darPermisos(Session, friend.webId, myBaseUrl + "LoMap/locations/comments", {
		read: true,
	});
	darPermisos(Session, friend.webId, myBaseUrl + "LoMap/locations/photos", {
		read: true,
	});
	darPermisos(Session, friend.webId, myBaseUrl + "LoMap/routes", {
		read: true,
	});*/
}

async function getAllFriends(Session, myBaseUrl) {
	let friendsDataset = await getSolidDataset(myBaseUrl + "LoMap/friends/", {
		fetch: Session.fetch,
	});
	let friends = getContainedResourceUrlAll(friendsDataset);
	let modelsFriend = new Array(friends.length);
	for (let i = 0; i < friends.length; i++) {
		let urlSplit = friends[i].split("/");
		modelsFriend[i] = await getFriendById(
			Session,
			urlSplit[urlSplit.length - 1].split(".")[0],
			myBaseUrl
		);
	}
	return modelsFriend;
}

async function getFriendById(Session, idFriend, myBaseUrl) {
	let file = await getFile(myBaseUrl + "LoMap/friends/" + idFriend + ".json", {
		fetch: Session.fetch,
	});

	return await parser.parseFriend(file);
}

async function deleteFriendById(Session, idFriend, myBaseUrl) {
	await deleteFile(myBaseUrl + "LoMap/friends/" + idFriend + ".json", {
		fetch: Session.fetch,
	});

	/*quitarPermisos(Session, idFriend, myBaseUrl + "LoMap/locations/locations");
	quitarPermisos(Session, idFriend, myBaseUrl + "LoMap/locations/reviews");
	quitarPermisos(Session, idFriend, myBaseUrl + "LoMap/locations/comments");
	quitarPermisos(Session, idFriend, myBaseUrl + "LoMap/locations/photos");
	quitarPermisos(Session, idFriend, myBaseUrl + "LoMap/routes");*/
}

/*async function darPermisos(Session, webId, carpetaUrl, permisos) {
	const carpeta = await Session.fetch(carpetaUrl);
  
	// Obtiene la lista de control de acceso (ACL) de la carpeta
	let acl = await AccessControlList.fetchFrom(carpeta);
	if (!acl) {
	  // Si la carpeta no tiene una ACL, crea una nueva a partir de la ACL por defecto
	  acl = createAclFromFallback(carpeta);
	}
  
	// Agrega el WebID y los permisos necesarios a la lista de control de acceso
	acl.addRule(webId, FOAF.Agent, VCARD.Individual, permisos);
	
	// Actualiza la lista de control de acceso de la carpeta con los nuevos permisos
	await Session.fetch(acl.saveTo(carpeta));
}*/

async function darPermisos(Session, webId, carpetaUrl, permisos) {
	await setAgentAccess(carpetaUrl, webId, permisos, { fetch: Session.fetch });
}

async function darPermisosPublicos(Session, carpetaUrl, permisos) {
	await setPublicAccess(carpetaUrl, permisos, { fetch: Session.fetch });
}

async function quitarPermisos(Session, webId, carpetaUrl) {
	const carpeta = await Session.fetch(carpetaUrl);

	// Obtiene la lista de control de acceso (ACL) de la carpeta
	const acl = await AccessControlList.fetchFrom(carpeta);

	// Elimina el WebID de la lista de control de acceso
	acl.removeRule(webId);

	// Actualiza la lista de control de acceso de la carpeta sin los permisos del WebID
	await Session.fetch(acl.saveTo(carpeta));
}

module.exports = {
	addFriend,
	getAllFriends,
	deleteFriendById,
	darPermisosPublicos,
};
