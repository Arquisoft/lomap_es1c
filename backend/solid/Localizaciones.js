const {
    createSolidDataset,
    createThing,
    getSolidDataset,
    getStringNoLocale,
    setThing,
    getThing,
    buildThing,
    saveSolidDatasetAt,
    getContainedResourceUrlAll
    } = require ('@inrupt/solid-client');

    const solid = require('./Solid.js');
  

    const { SCHEMA_INRUPT} = require('@inrupt/vocab-common-rdf');

  /**
   * @param {*} ubicacion : model de la ubicacion
   */
  async function addLocation(Session, ubicacion, myBaseUrl){

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
        solid.addReview(Session, ubicacion.reviews[i], myBaseUrl + "LoMap/" + "ubicaciones/"+ ubicacion.id);
  }
}



async function obtenerLocalizaciones(Session, myBaseUrl){
    //Obtener url de todas las ubicaciones
    let ubicacionDataset = await getSolidDataset(myBaseUrl + "LoMap/ubicaciones/", { fetch: Session.fetch});
    let ubicaciones = getContainedResourceUrlAll(ubicacionDataset);
    let modelsUbi = new Array(ubicaciones.length);
    for(let i=0;i<ubicaciones.length;i++){
      let urlSplit = ubicaciones[i].split('/');
        modelsUbi[i] = await obtenerLocalizacion(Session, urlSplit[urlSplit.length-1], myBaseUrl);
    }
    return modelsUbi;
  }
  
  
  
  /**
  * @param {*} urlUbi : id no absoluta
  * @returns 
  */
  async function obtenerLocalizacion(Session, urlUbi, myBaseUrl){
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
    let loc = new Location(urlUbi, name, address, latitude, longitude, category, await solid.getAllReviews(Session, urlUbi), []);
    return loc;
  }

  async function deleteLocationById(Session, idLocation, myBaseUrl){

    await deleteSolidDataset(myBaseUrl + "LoMap/ubicaciones/" + idLocation, { fetch: Session.fetch});
}


  module.exports={
    obtenerLocalizacion, obtenerLocalizaciones, addLocation, deleteLocationById
  };