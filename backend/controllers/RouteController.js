const solid = require("../solid/SolidPrueba.js");

async function getAllRoutes(req, res) {
	const routes = await solid.getAllRoutes();
	res.send(JSON.stringify(routes));
}

async function getRouteById(req, res) {
	const { id } = req.params;
	const route = await solid.getRouteById(id);
	if (route != null) {
		res.send(JSON.stringify(route));
	} else {
		res.status(404).json("No se han encontrado rutas con esa id");
	}
}

async function addRoute(req, res) {
	const { name, description } = req.body;
	if (!name) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	const route = new Route(name, description, req.session.user);
	await solid.saveRoute(route);
	res.status(201).json(route);
}
async function updateRoute(req, res) {
	const { id } = req.params;
	const { name, description } = req.body;
	if (!name) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	const route = await solid.getRouteById(id);
	route.name = name;
	route.description = description;
	await solid.saveRoute(route);
	res.status(200).json(route);
}

async function deleteRoute(req, res) {
	const { id } = req.params;
	const route = await solid.getRouteById(id);
	if (route == null) {
		res.status(404).json("No se han encontrado rutas con esa id");
		return;
	}
	await solid.deleteRoute(route);
	res.status(200).json(route);
}
async function addLocationToRoute(req, res) {
	const { id } = req.params;
	const { locationId } = req.body;
	const route = await solid.getRouteById(id);
	const location = await solid.getLocationById(locationId);
	if (route == null) {
		res.status(404).json("No se han encontrado rutas con esa id");
		return;
	}
	if (location == null) {
		res.status(404).json("No se han encontrado localizaciones con esa id");
		return;
	}
	route.addLocation(location);
	await solid.saveRoute(route);
	res.status(200).json(route);
}

async function deleteLocationFromRoute(req, res) {
	const { id, locationId } = req.params;
	await solid.deleteLocationFromRoute(id, locationId);
	res.status(200).json("Localización eliminada de la ruta");
}

async function changeOrderOfLocationInRoute(req, res) {
	const { id, locationId } = req.params;
	const { newPosition } = req.body;
	if (route == null) {
		res.status(404).json("No se han encontrado rutas con esa id");
		return;
	}
	if (location == null) {
		res.status(404).json("No se han encontrado localizaciones con esa id");
		return;
	}
	route.changeOrder(location, newPosition);
	await solid.saveRoute(route);
	res.status(200).json("Orden cambiado");
}

module.exports = {
	getAllRoutes,
	getRouteById,
	addRoute,
	updateRoute,
	deleteRoute,
	addLocationToRoute,
	deleteLocationFromRoute,
	changeOrderOfLocationInRoute,
};
