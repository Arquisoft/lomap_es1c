const { getSolidDataset, overwriteFile } = require("@inrupt/solid-client");

const parser = require("./util/Parser.js");
const serializer = require("./util/Serializer.js");

async function addFriend(Session, friend, myBaseUrl, friendBaseUrl) {
	let file = await serializer.serializeFriend(friend);

	await overwriteFile(friendBaseUrl +  "LoMap/friends/" + friend.webId + ".json", file, {
		contentType: file.type,
		fetch: Session.fetch,
	});

	darPermisos(Session, friend.id, myBaseUrl + "LoMap/locations/locations", 0);
	darPermisos(Session, friend.id, myBaseUrl + "LoMap/locations/reviews", 1);
	darPermisos(Session, friend.id, myBaseUrl + "LoMap/locations/comments", 1);
	darPermisos(Session, friend.id, myBaseUrl + "LoMap/locations/photos", 1);
	darPermisos(Session, friend.id, myBaseUrl + "LoMap/routes", 1);
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
			urlSplit[urlSplit.length - 1],
			myBaseUrl
		);
	}
	return modelsFriend;
}

async function getFriendById(Session, idFriend, myBaseUrl) {
	let file = await getFile(myBaseUrl + "LoMap/friends/" + idFriend + ".json", {
		fetch: Session.fetch,
	});

	return await parser.parseFriend(Session, myBaseUrl, file);
}

async function deleteFriendById(Session, idFriend, myBaseUrl, friendBaseUrl) {
	await deleteFile(friendBaseUrl + "LoMap/friends/" + idFriend + ".json", {
		fetch: Session.fetch,
	});

	quitarPermisos(Session, idFriend, myBaseUrl + "LoMap/locations/locations");
	quitarPermisos(Session, idFriend, myBaseUrl + "LoMap/locations/reviews");
	quitarPermisos(Session, idFriend, myBaseUrl + "LoMap/locations/comments");
	quitarPermisos(Session, idFriend, myBaseUrl + "LoMap/locations/photos");
	quitarPermisos(Session, idFriend, myBaseUrl + "LoMap/routes");
}

//permisos: 0 permiso de escritura y lectura
//			1 permiso de lectura
async function darPermisos(Session, idFriend, url, permisos) {}

async function quitarPermisos(Session, idFriend, url) {}

module.exports = {
	addFriend,
	getAllFriends,
	deleteFriendById,
};
