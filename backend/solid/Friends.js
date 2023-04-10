const {
	getSolidDataset,
	overwriteFile,
	getFile,
	getContainedResourceUrlAll,
	deleteFile,
	FOAF,
	VCARD,
	AccessControlList,
	universalAccess,

	getSolidDatasetWithAcl,
	hasResourceAcl,
	hasFallbackAcl,
	hasAccessibleAcl,
	createAcl,
	createAclFromFallbackAcl,
	getResourceAcl,
	setAgentResourceAccess,
	saveAclFor,
} = require("@inrupt/solid-client");

const parser = require("./util/Parser.js");
const serializer = require("./util/Serializer.js");

async function addFriend(Session, myBaseUrl, friend) {
	let file = await serializer.serializeFriend(friend);
	await overwriteFile(
		myBaseUrl + "/LoMap/friends/" + friend.id + ".json",
		file,
		{ fetch: Session.fetch }
	);
	/*
	await darPermisos(Session, friend.webid, myBaseUrl + "LoMap/", {
		read: true,
		write: true,
		append: true,
		controlRead: true,
		controlWrite: true,
	});

	await obtenerPermisos(Session, friend.webid, myBaseUrl + "LoMap/");
	*/
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

//Solo da permiso a la carpetaUrl pero no a las carpetas o recursos hijos
async function darPermisos(Session, webId, carpetaUrl, permisos) {
	await universalAccess.setAgentAccess(carpetaUrl, webId, permisos, {
		fetch: Session.fetch,
	});
}

//Da permiso a la carpetaUrl y todos sus hijos (no funciona)
/*async function darPermisos(Session, webId, carpetaUrl, permisos) {
	// Fetch the SolidDataset and its associated ACLs, if available:
const myDatasetWithAcl = await getSolidDatasetWithAcl(carpetaUrl, { fetch: Session.fetch } );

// Obtain the SolidDataset's own ACL, if available,
// or initialise a new one, if possible:
let resourceAcl;
if (!hasResourceAcl(myDatasetWithAcl)) {
  if (!hasAccessibleAcl(myDatasetWithAcl)) {
    throw new Error(
      "The current user does not have permission to change access rights to this Resource."
    );
  }
  if (!hasFallbackAcl(myDatasetWithAcl)) {
    throw new Error(
      "The current user does not have permission to see who currently has access to this Resource."
    );
    // Alternatively, initialise a new empty ACL as follows,
    // but be aware that if you do not give someone Control access,
    // **nobody will ever be able to change Access permissions in the future**:
    // resourceAcl = createAcl(myDatasetWithAcl);
	}
	resourceAcl = createAclFromFallbackAcl(myDatasetWithAcl, { fetch: Session.fetch });
} else {
  resourceAcl = getResourceAcl(myDatasetWithAcl, { fetch: Session.fetch });
}

// Give someone Control access to the given Resource:
const updatedAcl = setAgentResourceAccess(
  resourceAcl,
  webId,
  permisos, { fetch: Session.fetch }
);

// Now save the ACL:
await saveAclFor(myDatasetWithAcl, updatedAcl,  { fetch: Session.fetch });

}*/

async function obtenerPermisos(Session, webId, carpetaUrl) {
	await universalAccess
		.getAgentAccess(carpetaUrl, webId, { fetch: Session.fetch })
		.then((agentAccess) => {
			logAccessInfo(webId, agentAccess, carpetaUrl);
		});
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

function logAccessInfo(agent, agentAccess, resource) {
	console.log(`For resource::: ${resource}`);
	if (agentAccess === null) {
		console.log(`Could not load ${agent}'s access details.`);
	} else {
		console.log(`${agent}'s Access:: ${JSON.stringify(agentAccess)}`);
	}
}

module.exports = {
	addFriend,
	getAllFriends,
	deleteFriendById,
	darPermisosPublicos,
};
