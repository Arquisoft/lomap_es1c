const locations = require("./Locations.js");

const parser = require("../util/Parser.js");
const serializer = require("../util/Serializer.js");

// Añade una comment a la carpeta comment, no la añade a su location porque de eso ya se encarga addLocation
async function addComent(Session, coment) {
	let myUrl = await getPodUrlAll(Session.info.webId, { fetch: Session.fetch });
	myUrl = myUrl[0];

	let file = serializer.serializeCommentComplet(coment);

	await overwriteFile(
		myBaseUrl + "LoMap/locations/comments/" + coment.id + ".json",
		file,
		{
			contentType: file.type,
			fetch: Session.fetch,
		}
	);
}

async function getAllComents(Session, jsonComments) { //jsonComments es una lista de json { "author": //webId del autor", "idComment": //id }
	let comments = jsonComments.map(c => getComment(Session, c));
	return comments.filter(c => c!=null);
}


async function getComment(Session, jsonComment){
	try{
		let myUrl = await getPodUrlAll(jsonComment.author, { fetch: Session.fetch });
		myUrl = myUrl[0];
	
		let file = await getFile(myBaseUrl + "LoMap/locations/comments/" + jsonComment.id + ".json", {
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
