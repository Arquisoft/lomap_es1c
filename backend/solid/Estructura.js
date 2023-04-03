const {
    createSolidDataset,
    getSolidDataset,
    saveSolidDatasetAt,
    } = require ('@inrupt/solid-client');


async function construirEstructura(Session, myBaseUrl){
  try{
        //Creacion del dataset base
        let baseLomap = createSolidDataset();
        await saveSolidDatasetAt(
          myBaseUrl +  "LoMap/",
          baseLomap,
          { fetch: Session.fetch }             // fetch from authenticated Session
        );

        let locationsDataset = createSolidDataset();
        await saveSolidDatasetAt(
          myBaseUrl +  "LoMap/" + "locations/",
          locationsDataset,
          { fetch: Session.fetch }             // fetch from authenticated Session
        );


        let routesDataset = createSolidDataset();
        await saveSolidDatasetAt(
          myBaseUrl +  "LoMap/" + "routes/",
          routesDataset,
          { fetch: Session.fetch }             // fetch from authenticated Session
        );

        let fotosDataset = createSolidDataset();
        await saveSolidDatasetAt(
          myBaseUrl +  "LoMap/" + "fotos/",
          fotosDataset,
          { fetch: Session.fetch }             // fetch from authenticated Session
        );


    }
    catch(error){
        console.log(error);
    }

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