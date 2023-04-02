const {
    createSolidDataset,
    createThing,
    getSolidDataset,
    getStringNoLocale,
    setThing,
    getThing,
    buildThing,
    saveSolidDatasetAt,
    getContainedResourceUrlAll,
    overwriteFile,
    getFile,
    deleteFile 
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

    let file = await getFile(
      myBaseUrl + "LoMap/locations/" + idUbi,
      { fetch: Session.fetch }
    );

    return parser.parseLocation(file);
  }

  async function deleteLocationById(Session, idLocation, myBaseUrl){
    await deleteFile(
      myBaseUrl + "LoMap/locations/" + idLocation,
      { fetch: Session.fetch }
    );
}


  module.exports={
    obtenerLocalizacion, obtenerLocalizaciones, addLocation, deleteLocationById
  };