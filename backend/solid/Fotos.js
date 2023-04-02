

const locations = require('./Localizaciones.js');

async function addFoto(Session, foto, idUbicacion, myBaseUrl) {
    let ubicacion = await locations.obtenerLocalizacion(Session, idUbicacion, myBaseUrl);
    ubicacion.addFoto(foto);
    await locations.addLocation(Session, ubicacion, myBaseUrl);
}



async function getAllFotos(Session, idUbicacion, myBaseUrl) {

    let ubicacion = await locations.obtenerLocalizacion(Session, idUbicacion, myBaseUrl);
    return ubicacion.photos;

}


async function deleteFotoById(Session, idFoto, idUbicacion, myBaseUrl) {
    let ubicacion = await locations.obtenerLocalizacion(Session, idUbicacion, myBaseUrl);
    ubicacion.removePhoto(idFoto);
    await locations.addLocation(Session, ubicacion, myBaseUrl);
}


module.exports = {
    addFoto, getAllFotos, deleteFotoById
};