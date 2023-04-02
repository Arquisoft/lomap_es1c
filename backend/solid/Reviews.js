const {
  deleteFile 
} = require('@inrupt/solid-client');

const locations = require('./Localizaciones.js');


async function addReview(Session, review, idUbicacion, myBaseUrl) {

  let ubicacion = await locations.obtenerLocalizacion(Session, idUbicacion, myBaseUrl);
  ubicacion.addReview(review);
  await locations.addLocation(Session, ubicacion, myBaseUrl);

}



async function getAllReviews(Session, idUbicacion, myBaseUrl) {

  let ubicacion = await locations.obtenerLocalizacion(Session, idUbicacion, myBaseUrl);
  return ubicacion.reviews;


}



async function deleteReviewById(Session, idReview, idLocation, myBaseUrl) {
  let ubicacion = await locations.obtenerLocalizacion(Session, idLocation, myBaseUrl);
  ubicacion.removeReview(idReview);
  await locations.addLocation(Session, ubicacion, myBaseUrl);
}


 
module.exports = {
  addReview, getAllReviews, deleteReviewById
};