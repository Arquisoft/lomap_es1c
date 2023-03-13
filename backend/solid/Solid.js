import {
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
    getDecimal
    } from "@inrupt/solid-client";
  
    import { Session } from "@inrupt/solid-client-authn-browser";
  import { solid } from "@inrupt/solid-client/dist/constants";
    import { VCARD } from "@inrupt/vocab-common-rdf";
    import prueba from "./Soolid.js";
    import { SCHEMA_INRUPT, RDF, AS } from "@inrupt/vocab-common-rdf";


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



        //Creacion dataset contador ubicaciones
        let dtsetContador = createSolidDataset();
        let contador = buildThing(createThing({name: "value"}))
        .addInteger("https://schema.org/Integer", 0)
        .build(); 
        dtsetContador = setThing(dtsetContador, contador);
        await saveSolidDatasetAt(
        myBaseUrl +  "LoMap/" + "ubicaciones/idUbiMasGrande",
        dtsetContador,
        { fetch: Session.fetch }             // fetch from authenticated Session
      );

      
        //Creacion dataset contador reviews
        let dtsetContadorReviews = createSolidDataset();
        let contadorReviews = buildThing(createThing({name: "value"}))
        .addInteger("https://schema.org/Integer", 0)
        .build(); 
        dtsetContadorReviews = setThing(dtsetContadorReviews, contadorReviews);
        await saveSolidDatasetAt(
        myBaseUrl +  "LoMap/" + "reviews/idReviewMasGrande",
        dtsetContadorReviews,
        { fetch: Session.fetch }             // fetch from authenticated Session
      );


      
        //Creacion dataset contador fotos
        let dtsetContadorFotos = createSolidDataset();
        let contadorFotos = buildThing(createThing({name: "value"}))
        .addInteger("https://schema.org/Integer", 0)
        .build(); 
        dtsetContadorFotos = setThing(dtsetContadorFotos, contadorFotos);
        await saveSolidDatasetAt(
        myBaseUrl +  "LoMap/" + "fotos/idFotoMasGrande",
        dtsetContadorFotos,
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
  async function addUbicacion(Session, ubicacion){
        const webID = Session.info.webId;
        //Obtencion de url del pod
        let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
        myBaseUrl = myBaseUrl[0];
      
      
      
        //Obtener y aumentar contador de ubicaciones
        let datasetContador = await getSolidDataset(myBaseUrl + "LoMap/" + "ubicaciones/idUbiMasGrande", { fetch: Session.fetch});
        let contador = getThing(datasetContador, myBaseUrl + "LoMap/" + "ubicaciones/idUbiMasGrande#value");
        let numUbi = getInteger(contador, "https://schema.org/Integer");
        numUbi += 1;
        contador = buildThing(createThing({name: "value"}))
        .addInteger("https://schema.org/Integer", numUbi)
      .build(); 
      datasetContador = setThing(datasetContador, contador);
      await saveSolidDatasetAt(
        myBaseUrl + "LoMap/" + "ubicaciones/idUbiMasGrande",
        datasetContador,
        { fetch: Session.fetch }             // fetch from authenticated Session
        );
      
      
        //Creacion de ubicacion
        let ubicacionDataset = createSolidDataset();
          let myUbi = buildThing(createThing({name: "datos"}))
          .addStringNoLocale(SCHEMA_INRUPT.name, ubicacion.name)
          .addStringNoLocale("https://schema.org/address", ubicacion.address)
          .addStringNoLocale("https://schema.org/latitude", ubicacion.latitude)
          .addStringNoLocale("https://schema.org/longitude", ubicacion.longitude)
          .addStringNoLocale("https://schema.org/category", ubicacion.category)
      .build(); 
      let myUbiReviews = buildThing(createThing({name: "reviews"})).addInteger("https://schema.org/Integer", 0).build(); 
      let myUbiFotos = buildThing(createThing({name: "fotos"})).addInteger("https://schema.org/Integer", 0).build(); 
      
        ubicacionDataset = setThing(ubicacionDataset, myUbi);
        ubicacionDataset = setThing(ubicacionDataset, myUbiReviews);
        ubicacionDataset = setThing(ubicacionDataset, myUbiFotos);
        await saveSolidDatasetAt(
          myBaseUrl + "LoMap/" + "ubicaciones/"+ numUbi ,
          ubicacionDataset,
          { fetch: Session.fetch }             // fetch from authenticated Session
        );
      
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


        //Obtener y aumentar contador de reviews
        let datasetContador = await getSolidDataset(myBaseUrl + "LoMap/" + "reviews/idReviewMasGrande", { fetch: Session.fetch});
        let contador = getThing(datasetContador, myBaseUrl + "LoMap/" + "reviews/idReviewMasGrande#value");
        let numReview = getInteger(contador, "https://schema.org/Integer");
        numReview += 1;
        contador = buildThing(createThing({name: "value"}))
        .addInteger("https://schema.org/Integer", numReview)
        .build(); 
        datasetContador = setThing(datasetContador, contador);
        await saveSolidDatasetAt(
        myBaseUrl + "LoMap/" + "reviews/idReviewMasGrande",
        datasetContador,
        { fetch: Session.fetch }             // fetch from authenticated Session
        );


        //Creacion de review
        let reviewDataset = createSolidDataset();
        let myReview = buildThing(createThing({name: "datos"}))
        .addStringNoLocale("https://schema.org/Text", review.text)
        .addDecimal("https://schema.org/Float", review.rating)
        .build(); 
        reviewDataset = setThing(reviewDataset, myReview);
        await saveSolidDatasetAt(
        myBaseUrl + "LoMap/" + "reviews/" + numReview ,
        reviewDataset,
        { fetch: Session.fetch }             // fetch from authenticated Session
        );


        //Enlace con ubicacion
        let ubicacionDataset = await getSolidDataset(idUbicacion, { fetch: session.fetch});
        let myThing = getThing(ubicacionDataset, idUbicacion + "#reviews");
        let myReviews = buildThing(myThing)
        .addStringNoLocale("https://schema.org/Text", myBaseUrl + "LoMap/" + "reviews/" + numReview)
    .build(); 
      ubicacionDataset = setThing(ubicacionDataset, myReviews);
      await saveSolidDatasetAt(
        idUbicacion ,
        ubicacionDataset,
        { fetch: Session.fetch }             // fetch from authenticated Session
      );
}




async function readUbicaciones(Session){
      const webID = Session.info.webId;
      //Obtencion de url del pod
      let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
      myBaseUrl = myBaseUrl[0];
      //Obtener url de todas las ubicaciones
      let ubicacionDataset = await getSolidDataset(myBaseUrl + "LoMap/ubicaciones/", { fetch: Session.fetch});
      let ubicaciones = getContainedResourceUrlAll(ubicacionDataset);
      ubicaciones = ubicaciones.filter((str) => !str.includes("idUbiMasGrande"));
      
      let modelsUbi = new Array(ubicaciones.length);
      for(let i=0;i<ubicaciones.length;i++){
          modelsUbi[i] = await readUbicacion(Session, ubicaciones[i]);
      }
      
      return modelsUbi;

}



/**
 * @param {*} urlUbi : url absoluta de una ubicacion
 * @returns 
 */
async function readUbicacion(Session, urlUbi){
      let ubicacionDataset = await getSolidDataset(urlUbi, { fetch: Session.fetch});
      let ubiThing = getThing(ubicacionDataset, urlUbi + "#datos");

      let name = getStringNoLocale(ubiThing, SCHEMA_INRUPT.name);
      let address = getStringNoLocale(ubiThing, "https://schema.org/address");
      let latitude = getStringNoLocale(ubiThing,"https://schema.org/latitude");
      let longitude = getStringNoLocale(ubiThing,"https://schema.org/longitude");
      let category = getStringNoLocale(ubiThing, "https://schema.org/category");
      if(category == "null"){category = null;}
      
      let loc = new Location(name, address, latitude, longitude, category);
      return loc;
}

/**
 * @param {*} idUbicacion : url absoluta de una ubicacion
 * @returns 
 */
async function readReviews(Session, idUbicacion){
      const webID = Session.info.webId;
      //Obtencion de url del pod
      let myBaseUrl = await getPodUrlAll(webID, {fetch: Session.fetch});
      myBaseUrl = myBaseUrl[0];
      //Obtener url de todas las reviews
      let ubicacionDataset = await getSolidDataset(idUbicacion, { fetch: Session.fetch});
      let ubiThing = getThing(ubicacionDataset, idUbicacion + "#reviews");
      let reviewsUrls = getStringNoLocaleAll(ubiThing, "https://schema.org/Text");
      reviewsUrls = reviewsUrls.filter((str) => !str.includes("idReviewMasGrande"));


      let modelsReview = new Array(reviewsUrls.length);
      for(let i=0;i<reviewsUrls.length;i++){
        modelsReview[i] = await readReview(Session, reviewsUrls[i]);
      }
      return modelsReview;
 
}

/**
 * @param {*} urlReview : url absoluta de la review
 * @returns 
 */
async function readReview(Session, urlReview){
      let reviewsDataset = await getSolidDataset(urlReview, { fetch: Session.fetch});
      let reviewThing = getThing(reviewsDataset, urlReview + "#datos");

      let value = getDecimal(reviewThing, "https://schema.org/Float");
      let text = getStringNoLocale(reviewThing, "https://schema.org/Text");
      
      return new Review(value, text);
}




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


