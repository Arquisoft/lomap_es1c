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
	getPodUrlAll,
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
	darPermisos(
		Session,
		friend.webid,
		myBaseUrl + "LoMap/locations/locations.jsonld",
		{
			read: true,
			write: true,
		}
	);
	darPermisos(
		Session,
		friend.webid,
		myBaseUrl + "LoMap/locations/reviews.jsonld",
		{
			read: true,
		}
	);
	darPermisos(
		Session,
		friend.webid,
		myBaseUrl + "LoMap/locations/photos.jsonld",
		{
			read: true,
		}
	);
	darPermisos(Session, friend.webid, myBaseUrl + "LoMap/routes.jsonld", {
		read: true,
	});
	darPermisos(Session, friend.webid, myBaseUrl + "LoMap/friends.jsonld", {
		read: true,
	});

	let jsonLDFriend = await serializer.serializeFriend(friend);
	await serializer.serializeContenedor(
		Session,
		myBaseUrl + "LoMap/friends.jsonld",
		jsonLDFriend
	);
}

async function getAllFriends(Session, myBaseUrl) {
	let friendsJson = await parser.parseContainer(
		Session,
		myBaseUrl + "LoMap/friends.jsonld"
	);

	let friends = friendsJson.itemListElement.map((f) => isFriend(Session, f));

	for (let i = 0; i < friends.length; i++) {
		friends[i] = await friends[i];
	}

	return friends.filter((f) => f != null).map((f) => parser.parseFriend(f));
}

async function getFriendById(Session, idFriend, myBaseUrl) {
	let friends = (
		await parser.parseContainer(Session, myBaseUrl + "LoMap/friends.jsonld")
	).itemListElement;
	return parser.parseFriend(friends.find((f) => f.id == idFriend));
}

async function deleteFriendById(Session, idFriend, myBaseUrl) {
	let friend = await getFriendById(Session, idFriend, myBaseUrl);

	await serializer.deleteThing(
		Session,
		myBaseUrl + "LoMap/friends.jsonld",
		idFriend
	);
	darPermisos(
		Session,
		friend.webid,
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
		friend.webid,
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
		friend.webid,
		myBaseUrl + "LoMap/locations/photos.jsonld",
		{
			read: false,
			write: false,
			append: false,
			controlRead: false,
			controlWrite: false,
		}
	);
	darPermisos(Session, friend.webid, myBaseUrl + "LoMap/routes.jsonld", {
		read: false,
		write: false,
		append: false,
		controlRead: false,
		controlWrite: false,
	});
	darPermisos(Session, friend.webid, myBaseUrl + "LoMap/friends.jsonld", {
		read: false,
		write: false,
		append: false,
		controlRead: false,
		controlWrite: false,
	});
}

async function isFriend(Session, friend) {
	let myBaseUrl = await getPodUrlAll(friend.webid, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];
	try {
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

async function obtenerPermisos(Session, webId, carpetaUrl) {
	await universalAccess
		.getAgentAccess(carpetaUrl, webId, { fetch: Session.fetch })
		.then((agentAccess) => {
			logAccessInfo(webId, agentAccess, carpetaUrl);
		});
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
	getFriendById,
};
