const {
    getSolidDataset,
    getContainedResourceUrlAll,
    overwriteFile,
    getFile,
    deleteFile 
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
    let rutaDataset = await getSolidDataset(myBaseUrl + "LoMap/routes/", { fetch: Session.fetch});
    let rutas = getContainedResourceUrlAll(rutaDataset);
    let modelsRuta = new Array(rutas.length);
    for(let i=0;i<rutas.length;i++){
      let urlSplit = rutas[i].split('/');
      modelsRuta[i] = await getRouteById(Session, urlSplit[urlSplit.length-1], myBaseUrl);
    }
    return modelsRuta;

}




async function getRouteById(Session, idRoute, myBaseUrl) {
    let file = await getFile(
        myBaseUrl + "LoMap/routes/" + idRoute,
        { fetch: Session.fetch }
      );
  
      return parser.parseLocation(file);
}


async function deleteRouteById(Session, idRoute, myBaseUrl) {
    await deleteFile(
        myBaseUrl + "LoMap/routes/" + idRoute,
        { fetch: Session.fetch }
      );
}


module.exports = {
    addRoute, getAllRoutes, getRouteById, deleteRouteById
};