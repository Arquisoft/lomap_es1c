const {
	getSolidDataset,
	getContainedResourceUrlAll,
	overwriteFile,
	getFile,
	deleteFile,
} = require("@inrupt/solid-client");

const parser = require("./util/ParserRoute.js");
const serializer = require("./util/Serializer.js");

async function addRoute(Session, route, myBaseUrl) {
	let file = await serializer.serializeRoute(route);

	await overwriteFile(myBaseUrl + "LoMap/" + "routes/" + route.id + ".json", file, {
		contentType: file.type,
		fetch: Session.fetch,
	});
}

async function getAllRoutes(Session, myBaseUrl) {
	let rutaDataset = await getSolidDataset(myBaseUrl + "LoMap/routes/", {
		fetch: Session.fetch,
	});
	let rutas = getContainedResourceUrlAll(rutaDataset);
	let modelsRuta = new Array(rutas.length);
	for (let i = 0; i < rutas.length; i++) {
		let urlSplit = rutas[i].split("/");
		modelsRuta[i] = await getRouteById(
			Session,
			urlSplit[urlSplit.length - 1].split(".")[0],
			myBaseUrl
		);
	}
	return modelsRuta.filter(r => r!=null);
}

async function getRouteById(Session, idRoute, myBaseUrl) {
	try{
		let file = await getFile(myBaseUrl + "LoMap/routes/" + idRoute + ".json", {
			fetch: Session.fetch,
		});
	
		return await parser.parseRoute(Session, myBaseUrl, file);
	}
	catch(err){
		return null;
	}
}

async function deleteRouteById(Session, idRoute, myBaseUrl) {
	await deleteFile(myBaseUrl + "LoMap/routes/" + idRoute + ".json", {
		fetch: Session.fetch,
	});
}

module.exports = {
	addRoute,
	getAllRoutes,
	getRouteById,
	deleteRouteById,
};
