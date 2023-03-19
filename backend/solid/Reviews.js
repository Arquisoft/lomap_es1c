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
    } = require ('@inrupt/solid-client');



/**
   * @param {*} review : model de la review
   * @param {*} idUbicacion : url absoluta de la ubicaion
   */
async function addReview(Session, review, idUbicacion, myBaseUrl){

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



async function getAllReviews(Session, idUbicacion, myBaseUrl){
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


    async function deleteReviewById(Session, idReview, myBaseUrl){
    
        await deleteSolidDataset(myBaseUrl + "LoMap/reviews/" + idReview, { fetch: Session.fetch});
    }


    
module.exports={
    addReview, getAllReviews, getReviewById, deleteReviewById
  };