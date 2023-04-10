const solid = require("../solid/Solid.js");
const Route = require("../models/Route");
const SessionController = require("../controllers/util/SessionController.js");

async function getAllRoutes(req, res,next) {
	try {
		const session = SessionController.getSession(req, next);
		const routes = await solid.getAllRoutes(session, session.info.webId);
		res.status(200).json(JSON.stringify(routes));
	} catch (err) {
		next(err);
	}
}

async function getRouteById(req, res) {
	try {
		const { id } = req.params;
		const session = SessionController.getSession(req, next);
		const route = await solid.getRouteById(session, id, session.info.webId);
		if (route != null) {
			res.send(JSON.stringify(route));
		} else {
			res.status(404).json("No se han encontrado rutas con esa id");
		}
	} catch (err) {
		next(err);
	}
}

async function addRoute(req, res) {
	try {
		const session = SessionController.getSession(req, next);
		const { name, description } = req.body;
		if (!name) {
			res.status(400).json({ error: "Faltan datos" });
			return;
		}
		const route = new Route(name, description, session.info.webId);
		await solid.addRoute(session, route, session.info.webId);
		res.status(201).json(route);
	} catch (err) {
		next(err);
	}
}

async function updateRoute(req, res) {
	try {
		const session = SessionController.getSession(req, next);
		const { id } = req.params;
		const { name, description } = req.body;
		if (!name) {
			res.status(400).json({ error: "Faltan datos" });
			return;
		}
		const route = await solid.getRouteById(session, id, session.info.webId);
		if (route == null) {
			res.status(404).json("No se han encontrado rutas con esa id");
			return;
		}
		route.name = name;
		route.description = description;
		await solid.addRoute(session, route, session.info.webId);
		res.status(200).json(route);
	} catch (err) {
		next(err);
	}
}

async function deleteRoute(req, res) {
	try {
		const { id } = req.params;
		const route = await solid.getRouteById(session, id, session.info.webId);
		if (route == null) {
			res.status(404).json("No se han encontrado rutas con esa id");
			return;
		}
		const session = SessionController.getSession(req, next);
		await solid.deleteRouteById(session, id, session.info.webId);
	} catch (err) {
		next(err);
	}
}

async function addLocationToRoute(req, res) {
	try {
		const { idRoute, idLocation } = req.params;
		const session = SessionController.getSession(req, next);
		const route = await solid.getRouteById(
			session,
			idRoute,
			session.info.webId
		);
		const location = await solid.getLocationById(
			session,
			idLocation,
			session.info.webId
		);
		if (route == null) {
			res.status(404).json("No se han encontrado rutas con esa id");
			return;
		}
		if (location == null) {
			res.status(404).json("No se han encontrado localizaciones con esa id");
			return;
		}
		route.addLocation(location);
		await solid.saveRoute(session, route, session.info.webId);
		res.status(200).json(route);
	} catch (err) {
		next(err);
	}
}

async function deleteLocationFromRoute(req, res) {
	try {
		const { idRoute, idLocation } = req.params;
		const session = SessionController.getSession(req, next);
		const route = await solid.getRouteById(
			session,
			idRoute,
			session.info.webId
		);
		const location = await solid.getLocationById(
			session,
			idLocation,

			session.info.webId
		);
		if (route == null) {
			res.status(404).json("No se han encontrado rutas con esa id");
			return;
		}

		if (location == null) {
			res.status(404).json("No se han encontrado localizaciones con esa id");
			return;
		}
		route.deleteLocation(location.id);
		await solid.saveRoute(session, route, session.info.webId);
		res.status(200).json(route);
	} catch (err) {
		next(err);
	}
	await solid.deleteLocationFromRoute(id, locationId);
	res.status(200).json("Localización eliminada de la ruta");
}

async function changeOrderOfLocationInRoute(req, res) {
	try {
		const { id, locationId } = req.params;
		const { index } = req.body;
		const session = SessionController.getSession(req, next);
		const route = await solid.getRouteById(session, id, session.info.webId);
		const location = await solid.getLocationById(
			session,
			locationId,
			session.info.webId
		);
		if (route == null) {
			res.status(404).json("No se han encontrado rutas con esa id");
			return;
		}
		if (location == null) {
			res.status(404).json("No se han encontrado localizaciones con esa id");
			return;
		}
		route.changeOrder(location, index);
		await solid.saveRoute(session, route, session.info.webId);
		res.status(200).json("Orden cambiado");
	} catch (err) {
		next(err);
	}
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
