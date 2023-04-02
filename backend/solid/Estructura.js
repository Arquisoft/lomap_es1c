const {
    createSolidDataset,
    getSolidDataset,
    saveSolidDatasetAt,
    overwriteFile
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


        let structJson = { "locations":[], "routes":[] };

        let blob = new Blob([JSON.stringify(structJson)], {tupe: "application/json"});
        let file = new File([blob], "locations.json", {type: blob.type});
        
        await overwriteFile(
          myBaseUrl,
          file,
          { contentType: file.type, fetch: Session.fetch }
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