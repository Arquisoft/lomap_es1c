const {
	overwriteFile,
	getFile,
	deleteFile,
	getPodUrlAll
} = require("@inrupt/solid-client");

const locations = require("./Locations.js");

const parser = require("../util/Parser.js");
const serializer = require("../util/Serializer.js");

// Añade una comment a la carpeta comment, no la añade a su location porque de eso ya se encarga addLocation
async function addComent(Session, coment) {
	let myUrl = await getPodUrlAll(Session.info.webId, { fetch: Session.fetch });
	myUrl = myUrl[0];

	let file = await serializer.serializeCommentComplet(coment);

	await overwriteFile(
		myUrl + "LoMap/locations/comments/" + coment.id + ".json",
		file,
		{
			contentType: file.type,
			fetch: Session.fetch,
		}
	);
}

async function getAllComents(Session, jsonComments) { //jsonComments es una lista de json { "author": //webId del autor", "idComment": //id }
	for(let i=0;i<jsonComments.length;i++){
		jsonComments[i] = await getComment(Session, jsonComments[i]);
	}
	return jsonComments.filter(c => c!=null);
}


async function getComment(Session, jsonComment){
	try{
		let myUrl = await getPodUrlAll(jsonComment.author, { fetch: Session.fetch });
		myUrl = myUrl[0];
	
		let file = await getFile(myUrl + "LoMap/locations/comments/" + jsonComment.id + ".json", {
			fetch: Session.fetch,
		});
	
		return await parser.parseComent(file);
	}
	catch(err){
		return null;
	}
}

async function deleteComentById(Session, idComent) {
	let myUrl = await getPodUrlAll(jsonComment.author, { fetch: Session.fetch });
	myUrl = myUrl[0];

	await deleteFile(myUrl + "LoMap/locations/comments" + idComent + ".json", {
	fetch: Session.fetch,
	});
}

module.exports = {
	addComent,
	getAllComents,
	deleteComentById,
};
