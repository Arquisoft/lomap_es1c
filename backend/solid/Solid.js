const {
    addUrl,
    addStringNoLocale,
    createSolidDataset,
    createThing,
    getPodUrlAll,
    getSolidDataset,
    getThingAll,
    getStringNoLocale,
    removeThing,
    setThing,
    getThing,
    getUrlAll,
    buildThing,
    getInteger,
    saveSolidDatasetAt,
    getStringNoLocaleAll,
    getContainedResourceUrlAll,
    deleteSolidDataset,
    getDecimal
    } = require ('@inrupt/solid-client');

    const estructura = require('./Estructura.js');
    const localizaciones = require('./Localizaciones.js');
    const reviews = require('./Reviews.js');
    const fotos = require('./Fotos.js');
    const routes = require('./Routes.js');
    const friends = require('./Friends.js');
  

    const { SCHEMA_INRUPT, RDF, AS } = require('@inrupt/vocab-common-rdf');

//ESTRUCTURA
//ESTRUCTURA
//ESTRUCTURA
//ESTRUCTURA
//ESTRUCTURA

  async function createStruct(Session){
        const webID = Session.info.webId;
        //Obtencion de url del pod
        let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
        myBaseUrl = myBaseUrl[0];

        await estructura.construirEstructura(Session, myBaseUrl);
}

async function isStructCreated(Session){
  const webID = Session.info.webId;
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
  myBaseUrl = myBaseUrl[0];

   await estructura.comprobanteEstructura(Session, myBaseUrl);
}



//LOCALIZACIONES
//LOCALIZACIONES
//LOCALIZACIONES
//LOCALIZACIONES
//LOCALIZACIONES

  /**
   * @param {*} ubicacion : model de la ubicacion
   */
  async function saveLocation(Session, ubicacion){

        const webID = Session.info.webId;
        //Obtencion de url del pod
        let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
        myBaseUrl = myBaseUrl[0];

        await localizaciones.addLocation(Session, ubicacion, myBaseUrl);
  }


  async function getAllLocations(Session){
    const webID = Session.info.webId;
    //Obtencion de url del pod
    let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
    myBaseUrl = myBaseUrl[0];
  
    await localizaciones.obtenerLocalizaciones(Session, myBaseUrl);
  }


/**
* @param {*} urlUbi : id no absoluta
* @returns 
*/
async function getLocationById(Session, urlUbi){
  const webID = Session.info.webId;
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
  myBaseUrl = myBaseUrl[0];
  
  await localizaciones.obtenerLocalizacion(Session, urlUbi, myBaseUrl);
  
  }


  async function deleteLocationById(Session, idLocation){
    const webID = Session.info.webId;
    //Obtencion de url del pod
    let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
    myBaseUrl = myBaseUrl[0];

    await localizaciones.deleteLocationById(Session, idLocation, myBaseUrl);
  }


//REVIEWS
//REVIEWS
//REVIEWS
//REVIEWS
//REVIEWS

  /**
   * @param {*} review : model de la review
   * @param {*} idUbicacion : url absoluta de la ubicaion
   */
  async function addReview(Session, review, idUbicacion){
        const webID = Session.info.webId;
        //Obtencion de url del pod
        let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
        myBaseUrl = myBaseUrl[0];

        await reviews.addReview(Session, review, idUbicacion, myBaseUrl);
  }





  async function getAllReviews(Session, idUbicacion){
        const webID = Session.info.webId;
        //Obtencion de url del pod
        let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
        myBaseUrl = myBaseUrl[0];
        await reviews.getAllReviews(Session, idUbicacion);

  }

/**
* @param {*} urlReview : url absoluta de la review
* @returns 
*/
async function getReviewById(Session, urlReview){
    await reviews.getReviewById(Session, urlReview);
}



async function deleteReviewById(Session, idReview){
    const webID = Session.info.webId;
    //Obtencion de url del pod
    let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
    myBaseUrl = myBaseUrl[0];

    await reviews.deleteReviewById(Session, idReview, myBaseUrl);
  }


//FOTOS
//FOTOS
//FOTOS
//FOTOS
//FOTOS

async function addFoto(Session, foto, idUbicacion){
  const webID = Session.info.webId;
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
  myBaseUrl = myBaseUrl[0];

  await fotos.addFoto(Session, foto, idUbicacion, myBaseUrl);
}


async function getAllFotos(Session, idUbicacion){
  const webID = Session.info.webId;
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
  myBaseUrl = myBaseUrl[0];
  await fotos.getAllFotos(Session, idUbicacion);

}


async function getFotoById(Session, idFoto){
  await fotos.getFotoById(Session, idFoto);
}


async function deleteFotoById(Session, idFoto){
  const webID = Session.info.webId;
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
  myBaseUrl = myBaseUrl[0];

  await fotos.deleteFotoById(Session, idFoto, myBaseUrl);
}


//ROUTES
//ROUTES
//ROUTES
//ROUTES
//ROUTES

async function addRoute(Session, route){
  const webID = Session.info.webId;
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
  myBaseUrl = myBaseUrl[0];

  await routes.addRoute(Session, route, myBaseUrl);
}


async function getAllRoutes(Session){
  const webID = Session.info.webId;
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
  myBaseUrl = myBaseUrl[0];
  await routes.getAllRoutes(Session);

}


async function getRouteById(Session, idRoute){
  await routes.getRouteById(Session, idRoute);
}


async function deleteRouteById(Session, idRoute){
  const webID = Session.info.webId;
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
  myBaseUrl = myBaseUrl[0];

  await routes.deleteRouteById(Session, idRoute, myBaseUrl);
}


//FRIENDS
//FRIENDS
//FRIENDS
//FRIENDS
//FRIENDS

async function addFriend(Session, friend){
  const webID = Session.info.webId;
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
  myBaseUrl = myBaseUrl[0];

  await friends.addFriend(Session, friend, myBaseUrl);
}


async function getAllFriends(Session){
  const webID = Session.info.webId;
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
  myBaseUrl = myBaseUrl[0];
  await friends.getAllFriends(Session);

}



async function deleteFriendById(Session, idFriend){
  const webID = Session.info.webId;
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
  myBaseUrl = myBaseUrl[0];

  await friends.deleteFriendById(Session, idFriend, myBaseUrl);
}


module.exports={
  createStruct, isStructCreated, saveLocation, addReview, getAllLocations, getLocationById, getAllReviews, getReviewById, deleteLocationById, deleteReviewById
};
