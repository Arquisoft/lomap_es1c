const solid = require("../solid/Solid.js");
const Route = require("../models/Route");

async function getAllRoutes(session) {
	try {
		const routes = await solid.getAllRoutes(session, session.info.webId);
		return routes;
	} catch (err) {
		throw new Error("Problema al obtener las rutas");
	}
}
/*
async function getAllRoutesAllInfo(session) {
	try {
		const routes = await solid.getAllRoutesMinimalInfo(
			session,
			session.info.webId
		);
		return routes;
	} catch (err) {
		throw new Error("Problema al obtener las rutas");
	}
}
*/
async function getAllLocationsByRouteId(session, idRoute) {
	try {
		const route = await solid.getRouteById(
			session,
			idRoute,
			session.info.webId
		);
		if (route != null) {
			return route.locations;
		} else {
			throw new Error("No se han encontrado rutas con esa id");
		}
	} catch (err) {
		throw new Error("Problema al obtener la ruta");
	}
}

async function getRouteById(session, id) {
	try {
		const route = await solid.getRouteById(session, id, session.info.webId);
		if (route != null) {
			return route;
		} else {
			throw new Error("No se han encontrado rutas con esa id");
		}
	} catch (err) {
		throw new Error("Problema al obtener la ruta");
	}
}

async function addRoute(session, route1) {
	try {
		const name = route1.name;
		const description = route1.description;
		if (!name) {
			throw new Error("Faltan datos");
		}
		const route = new Route(name, description, session.info.webId);
		await solid.addRoute(session, route, session.info.webId);
		return route;
	} catch (err) {
		throw new Error("Problema al crear la ruta");
	}
}

async function updateRoute(session, id, route1) {
	try {
		const name = route1.name;
		const description = route1.description;
		if (!name) {
			throw new Error("Faltan datos");
		}
		const route = await solid.getRouteById(session, id, session.info.webId);
		if (route == null) {
			throw new Error("No se han encontrado rutas con esa id");
		}
		route.name = name;
		route.description = description;
		await solid.addRoute(session, route, session.info.webId);
		return route;
	} catch (err) {
		throw new Error("Problema al actualizar la ruta");
	}
}

async function deleteRoute(session, id) {
	try {
		const route = await solid.getRouteById(session, id, session.info.webId);
		if (route == null) {
			throw new Error("No se han encontrado rutas con esa id");
		}
		await solid.deleteRouteById(session, id, session.info.webId);
		return route;
	} catch (err) {
		throw new Error("Problema al eliminar la ruta");
	}
}

async function addLocationToRoute(session, idRoute, idLocation) {
	try {
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
			throw new Error("No se han encontrado rutas con esa id");
		}
		if (location == null) {
			throw new Error("No se han encontrado localizaciones con esa id");
		}
		route.addLocation(location);
		await solid.addRoute(session, route, session.info.webId);

		return route;
	} catch (err) {
		throw new Error("Problema añadiendo la localización a la ruta");
	}
}

async function deleteLocationFromRoute(session, idRoute, idLocation) {
	try {
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
			throw new Error("No se han encontrado rutas con esa id");
		}

		if (location == null) {
			throw new Error("No se han encontrado localizaciones con esa id");
		}
		route.deleteLocation(location.id);
		await solid.addRoute(session, route, session.info.webId);
		return route;
	} catch (err) {
		throw new Error("Problema borrando la localización de la ruta");
	}
}
/*
async function changeOrderOfLocationInRoute(
	session,
	idRoute,
	idLocation,
	index
) {
	try {
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
			throw new Error("No se han encontrado rutas con esa id");
		}
		if (location == null) {
			throw new Error("No se han encontrado localizaciones con esa id");
		}
		route.changeOrder(location, index);
		await solid.saveRoute(session, route, session.info.webId);
		return route;
	} catch (err) {
		throw new Error(err);
	}
}
*/

module.exports = {
	getAllRoutes,

	getRouteById,
	addRoute,
	updateRoute,
	deleteRoute,
	addLocationToRoute,
	deleteLocationFromRoute,

	getAllLocationsByRouteId,
};
