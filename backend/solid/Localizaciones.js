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

    const parser = require('./Parser.js');
    const serializer = require('./Serializer.js');
  

    const { SCHEMA_INRUPT} = require('@inrupt/vocab-common-rdf');


  async function addLocation(Session, ubicacion, myBaseUrl){

    let file = serializer.serializeLocation(ubicacion);

    await overwriteFile(
      myBaseUrl + "LoMap/" + "locations/",
      file,
      { contentType: file.type, fetch: Session.fetch }
    );
}



async function obtenerLocalizaciones(Session, myBaseUrl){
    //Obtener url de todas las ubicaciones
    let ubicacionDataset = await getSolidDataset(myBaseUrl + "LoMap/locations/", { fetch: Session.fetch});
    let ubicaciones = getContainedResourceUrlAll(ubicacionDataset);
    let modelsUbi = new Array(ubicaciones.length);
    for(let i=0;i<ubicaciones.length;i++){
      let urlSplit = ubicaciones[i].split('/');
        modelsUbi[i] = await obtenerLocalizacion(Session, urlSplit[urlSplit.length-1], myBaseUrl);
    }
    return modelsUbi;
  }
  
  
  
  async function obtenerLocalizacion(Session, idUbi, myBaseUrl){

    

    /*
    let ubicacionDataset = await getSolidDataset(myBaseUrl + "LoMap/locations/" + urlUbi, { fetch: Session.fetch});
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
    return loc;*/
  }

  async function deleteLocationById(Session, idLocation, myBaseUrl){
    /*
    await deleteSolidDataset(myBaseUrl + "LoMap/ubicaciones/" + idLocation, { fetch: Session.fetch});
    */
}


  module.exports={
    obtenerLocalizacion, obtenerLocalizaciones, addLocation, deleteLocationById
  };