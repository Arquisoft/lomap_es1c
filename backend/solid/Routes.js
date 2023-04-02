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

async function addRoute(Session, route, myBaseUrl) {
    let file = serializer.serializeLocation(route);

    await overwriteFile(
      myBaseUrl + "LoMap/" + "routes/",
      file,
      { contentType: file.type, fetch: Session.fetch }
    );
}



async function getAllRoutes(Session, myBaseUrl) {


}




async function getRouteById(Session, idRoute, myBaseUrl) {

}


async function deleteRouteById(Session, idRoute, myBaseUrl) {

}


module.exports = {
    addRoute, getAllRoutes, getRouteById, deleteRouteById
};