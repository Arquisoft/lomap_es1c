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
  

    const { SCHEMA_INRUPT, RDF, AS } = require('@inrupt/vocab-common-rdf');


  async function createStruct(Session){
        const webID = Session.info.webId;
        //Obtencion de url del pod
        let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
        myBaseUrl = myBaseUrl[0];

        //Creacion del dataset base
        let baseLomap = createSolidDataset();
        await saveSolidDatasetAt(
          myBaseUrl +  "LoMap/",
          baseLomap,
          { fetch: Session.fetch }             // fetch from authenticated Session
        );

        //Creacion de datasets
        let amigos = createSolidDataset();
        let ubicaciones = createSolidDataset();
        let reviews = createSolidDataset();
        let fotos = createSolidDataset();
        await saveSolidDatasetAt(
          myBaseUrl +  "LoMap/" + "amigos/",
          amigos,
          { fetch: Session.fetch }             // fetch from authenticated Session
        );
        await saveSolidDatasetAt(
          myBaseUrl +  "LoMap/" + "ubicaciones/",
          ubicaciones,
          { fetch: Session.fetch }             // fetch from authenticated Session
        );
        await saveSolidDatasetAt(
          myBaseUrl +  "LoMap/" + "reviews/",
          reviews,
          { fetch: Session.fetch }             // fetch from authenticated Session
        );
        await saveSolidDatasetAt(
          myBaseUrl +  "LoMap/" + "fotos/",
          fotos,
          { fetch: Session.fetch }             // fetch from authenticated Session
        );


}

async function isStructCreated(Session){
  const webID = Session.info.webId;
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
  myBaseUrl = myBaseUrl[0];

  try{
    await getSolidDataset(myBaseUrl + "LoMap/", { fetch: Session.fetch});
  }catch(e){
    return false;
  }
  return true;
}


  /**
   * @param {*} ubicacion : model de la ubicacion
   */
  async function saveLocation(Session, ubicacion){
        const webID = Session.info.webId;
        //Obtencion de url del pod
        let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
        myBaseUrl = myBaseUrl[0];

        //Creacion de ubicacion
        let ubicacionDataset = createSolidDataset();
          let myUbi = buildThing(createThing({name: "datos"}))
          .addStringNoLocale(SCHEMA_INRUPT.name, ubicacion.name)
          .addStringNoLocale("https://schema.org/address", ubicacion.address)
          .addStringNoLocale("https://schema.org/latitude", ubicacion.latitude.toString())
          .addStringNoLocale("https://schema.org/longitude", ubicacion.longitude.toString())
          .addStringNoLocale("https://schema.org/category", ubicacion.category)
      .build(); 
      let myUbiReviews = buildThing(createThing({name: "reviews"})).addInteger("https://schema.org/Integer", 0).build(); 
      let myUbiFotos = buildThing(createThing({name: "fotos"})).addInteger("https://schema.org/Integer", 0).build(); 
      
        ubicacionDataset = setThing(ubicacionDataset, myUbi);
        ubicacionDataset = setThing(ubicacionDataset, myUbiReviews);
        ubicacionDataset = setThing(ubicacionDataset, myUbiFotos);
        await saveSolidDatasetAt(
          myBaseUrl + "LoMap/" + "ubicaciones/"+ ubicacion.id ,
          ubicacionDataset,
          { fetch: Session.fetch }             // fetch from authenticated Session
        );


      for(let i=0;i<ubicacion.reviews.length;i++){
          addReview(Session, ubicacion.reviews[i], myBaseUrl + "LoMap/" + "ubicaciones/"+ ubicacion.id);
      }
  }

  /**
   * @param {*} review : model de la review
   * @param {*} idUbicacion : url absoluta de la ubicaion
   */
  async function addReview(Session, review, idUbicacion){
        const webID = Session.info.webId;
        //Obtencion de url del pod
        let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
        myBaseUrl = myBaseUrl[0];


        //Creacion de review
        let reviewDataset = createSolidDataset();
        let myReview = buildThing(createThing({name: "datos"}))
        .addStringNoLocale("https://schema.org/Text", review.text)
        .addDecimal("https://schema.org/Float", review.rating)
        .build(); 
        reviewDataset = setThing(reviewDataset, myReview);
        await saveSolidDatasetAt(
        myBaseUrl + "LoMap/" + "reviews/" + review.id ,
        reviewDataset,
        { fetch: Session.fetch }             // fetch from authenticated Session
        );


        //Enlace con ubicacion
        let ubicacionDataset = await getSolidDataset(idUbicacion, { fetch: session.fetch});
        let myThing = getThing(ubicacionDataset, idUbicacion + "#reviews");
        let myReviews = buildThing(myThing)
        .addStringNoLocale("https://schema.org/Text", myBaseUrl + "LoMap/" + "reviews/" + review.id)
        .build(); 
      ubicacionDataset = setThing(ubicacionDataset, myReviews);
      await saveSolidDatasetAt(
        idUbicacion ,
        ubicacionDataset,
        { fetch: Session.fetch }             // fetch from authenticated Session
      );
}

async function getAllLocations(Session){
  const webID = Session.info.webId;
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
  myBaseUrl = myBaseUrl[0];
  //Obtener url de todas las ubicaciones
  let ubicacionDataset = await getSolidDataset(myBaseUrl + "LoMap/ubicaciones/", { fetch: Session.fetch});
  let ubicaciones = getContainedResourceUrlAll(ubicacionDataset);
  let modelsUbi = new Array(ubicaciones.length);
  for(let i=0;i<ubicaciones.length;i++){
    let urlSplit = ubicaciones[i].split('/');
      modelsUbi[i] = await getLocationById(Session, urlSplit[urlSplit.length-1]);
  }
  return modelsUbi;
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

  let ubicacionDataset = await getSolidDataset(myBaseUrl + "LoMap/ubicaciones/" + urlUbi, { fetch: Session.fetch});
  let ubiThing = getThing(ubicacionDataset, myBaseUrl + "LoMap/ubicaciones/" + urlUbi + "#datos");
  let name = getStringNoLocale(ubiThing, SCHEMA_INRUPT.name);
  let address = getStringNoLocale(ubiThing, "https://schema.org/address");
  let latitude = getStringNoLocale(ubiThing,"https://schema.org/latitude");
  latitude = parseFloat(latitude);
  let longitude = getStringNoLocale(ubiThing,"https://schema.org/longitude");
  longitude = parseFloat(longitude);
  let category = getStringNoLocale(ubiThing, "https://schema.org/category");
  if(category == "null"){category = null;}
  let loc = new Location(urlUbi, name, address, latitude, longitude, category, await getAllReviews(Session, urlUbi), []);
  return loc;
}

async function getAllReviews(Session, idUbicacion){
const webID = Session.info.webId;
//Obtencion de url del pod
let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
myBaseUrl = myBaseUrl[0];
//Obtener url de todas las reviews
let ubicacionDataset = await getSolidDataset(myBaseUrl + "LoMap/ubicaciones/" + idUbicacion, { fetch: Session.fetch});
let ubiThing = getThing(ubicacionDataset, myBaseUrl + "LoMap/ubicaciones/" + idUbicacion + "#reviews");
let reviewsUrls = getStringNoLocaleAll(ubiThing, "https://schema.org/Text");

let modelsReview = new Array(reviewsUrls.length);
for(let i=0;i<reviewsUrls.length;i++){
  try{
    modelsReview[i] = await getReviewById(Session, reviewsUrls[i]);
  }
  catch(e){modelsReview[i] = null;}
}
modelsReview = modelsReview.filter(r => r != null);
return modelsReview;

}

/**
* @param {*} urlReview : url absoluta de la review
* @returns 
*/
async function getReviewById(Session, urlReview){
let reviewsDataset = await getSolidDataset(urlReview, { fetch: Session.fetch});
let reviewThing = getThing(reviewsDataset, urlReview + "#datos");

let value = getDecimal(reviewThing, "https://schema.org/Float");
let text = getStringNoLocale(reviewThing, "https://schema.org/Text");
if(text == "null"){text = null;}
if(value == "null"){value = null;}
let urlSplit = urlReview.split('/');
return new Review(urlSplit[urlSplit.length-1], value, text);
}


async function deleteLocationById(Session, idLocation){
    const webID = Session.info.webId;
    //Obtencion de url del pod
    let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
    myBaseUrl = myBaseUrl[0];

    await deleteSolidDataset(myBaseUrl + "LoMap/ubicaciones/" + idLocation, { fetch: Session.fetch});
}

async function deleteReviewById(Session, idReview){
    const webID = Session.info.webId;
    //Obtencion de url del pod
    let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
    myBaseUrl = myBaseUrl[0];

    await deleteSolidDataset(myBaseUrl + "LoMap/reviews/" + idReview, { fetch: Session.fetch});
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





    module.exports={
     readUbicacion
    };


