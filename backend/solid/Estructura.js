const {
    createSolidDataset,
    getSolidDataset,
    saveSolidDatasetAt
    } = require ('@inrupt/solid-client');


async function construirEstructura(Session, myBaseUrl){
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


async function comprobanteEstructura(Session, myBaseUrl){
    try{
      await getSolidDataset(myBaseUrl + "LoMap/", { fetch: Session.fetch});
    }catch(e){
      return false;
    }
    return true;
  }




  module.exports={
    construirEstructura, comprobanteEstructura
  };