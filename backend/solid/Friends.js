const {
    createSolidDataset,
    createThing,
    getSolidDataset,
    getStringNoLocale,
    setThing,
    getThing,
    buildThing,
    saveSolidDatasetAt,
    getStringNoLocaleAll,
    deleteSolidDataset,
    getDecimal
} = require('@inrupt/solid-client');

const parser = require('./Parser.js');
const serializer = require('./Serializer.js');

async function addFriend(Session, friend, myBaseUrl) {

}



async function getAllFriends(Session, myBaseUrl) {
    let friendsDataset = await getSolidDataset(myBaseUrl + "friends/", { fetch: Session.fetch});
    let friends = getContainedResourceUrlAll(friendsDataset);
    let modelsFriend = new Array(friends.length);
    for(let i=0;i<friends.length;i++){
      let urlSplit = friends[i].split('/');
      modelsFriend[i] = await getFriendById(Session, urlSplit[urlSplit.length-1], myBaseUrl);
    }
    return modelsFriend;

}


async function getFriendById(Session, idFriend, myBaseUrl){

    let file = await getFile(
      myBaseUrl + "friends/" + idFriend,
      { fetch: Session.fetch }
    );

    return await parser.parseFriend(Session, myBaseUrl, file);
  }


async function deleteFriendById(Session, idFriend, myBaseUrl) {

}


async function darPermisos(Session, idFriend, url){

}


module.exports = {
    addFriend, getAllFriends, deleteFriendById
};