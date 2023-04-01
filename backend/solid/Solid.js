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


module.exports={
  createStruct, isStructCreated, saveLocation, addReview, getAllLocations, getLocationById, getAllReviews, getReviewById, deleteLocationById, deleteReviewById
};




  //Obtener url de un POD
  /*
    const mypods = await getPodUrlAll(webID, { fetch: fetch });
  */


  //Obtener un SolidDataset
  /*
    let myDataset = await getSolidDataset(urlSolidDataset, { fetch: session.fetch});
  */

    //Obtener todos los recursos de un solidDataset
    /*
      getContainedResourceUrlAll(solidDataset): UrlString[]
    */

  //Obtener un Thing
  /*
    let myThing = getThing(myDataset, urlThing);
    .................................................................
    let myThings = getThings(myDataset);    retorna Things[]
  */

  //Obtener atributo de un Thing
  /* 
    getBoolean(myThing, propertyName);
    getBooleanAll(myThing, propertyName);
    getDate(myThing, propertyName);
    getDateAll(myThing, propertyName);
    getDatetime(myThing, propertyName);
    getDatetimeAll(myThing, propertyName);
    getDecimal(myThing, propertyName);
    getDecimalAll(myThing, propertyName);
    getInteger(myThing, propertyName);
    getIntegerAll(myThing, propertyName);
    getStringByLocaleAll(myThing, propertyName);
    getStringNoLocale(myThing, propertyName);
    getStringNoLocaleAll(myThing, propertyName);
    getStringWithLocale(myThing, propertyName);
    getStringWithLocaleAll(myThing, propertyName);
    getTime(myThing, propertyName);
    getTimeAll(myThing, propertyName);
    getUrl(myThing, propertyName);
    getUrlAll(myThing, propertyName);
  */




  //Crear un SolidDataset
  /*
    let mySolidDataset = createSolidDataset();
  */


  //Crear un Thing
  /*
    const newBookThing1 = buildThing(createThing({ name: "book1" }))
  .addUrl(RDF.type, "https://schema.org/Book")
  .build(); 
  */

    //Modificar un Thing
  /*
    const newBookThing1 = buildThing(newBookThing1)
  .addStringNoLocale(SCHEMA_INRUPT.name, "ABC123 of Example Literature")
  .addInteger("https://schema.org/numberOfPages", 30)
  .addUrl(RDF.type, "https://schema.org/Book")
  .build(); 
  */




//Agregar Things a un SolidDataset
  /*
  //agrega dos Things
   mySolidDataset = setThing(mySolidDataset, newBookThing1);
   mySolidDataset = setThing(mySolidDataset, newBookThing2);
  */


//Actualizar solidDataset en el POD
  /*
const savedSolidDataset = await saveSolidDatasetAt(
    "https://pod.example.com/universityZ/fall2021/courses/Writing101",
    mySolidDataset,
    { fetch: session.fetch }             // fetch from authenticated Session
  );
  */


//Eliminar solidDataset en el POD
  /*
try {
    await deleteSolidDataset(
        "https://pod.example.com/universityZ/fall2021/courses/Writing101", 
        { fetch: session.fetch }           // fetch function from authenticated session
    );
    } catch (error) {
    //...
    }
  */


