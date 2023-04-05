const { getSolidDataset, overwriteFile } = require("@inrupt/solid-client");

const parser = require("./util/Parser.js");
const serializer = require("./util/Serializer.js");

async function addFriend(Session, friend, myBaseUrl, friendBaseUrl) {
	let file = await serializer.serializeFriend(friend);

	await overwriteFile(friendBaseUrl +  "LoMap/friends/" + friend.webId + ".json", file, {
		contentType: file.type,
		fetch: Session.fetch,
	});

	darPermisos(Session, friend.id, myBaseUrl + "LoMap/friends/");
}

async function getAllFriends(Session, myBaseUrl) {
	let friendsDataset = await getSolidDataset(myBaseUrl + "friends/", {
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
	let file = await getFile(myBaseUrl + "friends/" + idFriend, {
		fetch: Session.fetch,
	});

	return await parser.parseFriend(Session, myBaseUrl, file);
}

async function deleteFriendById(Session, idFriend, myBaseUrl, friendBaseUrl) {
	await deleteFile(friendBaseUrl + "friends/" + idFriend, {
		fetch: Session.fetch,
	});

	quitarPermisos(Session, idFriend, myBaseUrl + "friends/");
}

async function darPermisos(Session, idFriend, url) {}

async function quitarPermisos(Session, idFriend, url) {}

module.exports = {
	addFriend,
	getAllFriends,
	deleteFriendById,
};
