import {
	getAllRoutes as getAllRoutes_,
	getRouteById as getRouteById_,
	addRoute as addRoute_,
	deleteRouteById,
	getLocationById,
} from "../solid/Solid.js";
import Route from "../models/Route";

async function getAllRoutes(session) {
	try {
		const routes = await getAllRoutes_(session, session.info.webId);
		return routes;
	} catch (err) {
		throw new Error("Problema al obtener las rutas");
	}
}

async function getAllLocationsByRouteId(session, idRoute) {
	try {
		const route = await getRouteById_(
			session,
			idRoute,
			session.info.webId
		);
		if (route !== null) {
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
		const route = await getRouteById_(session, id, session.info.webId);
		if (route !== null) {
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
		await addRoute_(session, route, session.info.webId);
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
		const route = await getRouteById_(session, id, session.info.webId);
		if (route === null) {
			throw new Error("No se han encontrado rutas con esa id");
		}
		route.name = name;
		route.description = description;
		await addRoute_(session, route, session.info.webId);
		return route;
	} catch (err) {
		throw new Error("Problema al actualizar la ruta");
	}
}

async function deleteRoute(session, id) {
	try {
		const route = await getRouteById_(session, id, session.info.webId);
		if (route === null) {
			throw new Error("No se han encontrado rutas con esa id");
		}
		await deleteRouteById(session, id, session.info.webId);
		return route;
	} catch (err) {
		throw new Error("Problema al eliminar la ruta");
	}
}

async function addLocationToRoute(session, idRoute, idLocation) {
	try {
		const route = await getRouteById_(
			session,
			idRoute,
			session.info.webId
		);
		const location = await getLocationById(
			session,
			idLocation,
			session.info.webId
		);
		if (route === null) {
			throw new Error("No se han encontrado rutas con esa id");
		}
		if (location === null) {
			throw new Error("No se han encontrado localizaciones con esa id");
		}
		route.addLocation(location);
		await addRoute_(session, route, session.info.webId);

		return route;
	} catch (err) {
		throw new Error("Problema añadiendo la localización a la ruta");
	}
}

async function deleteLocationFromRoute(session, idRoute, idLocation) {
	try {
		const route = await getRouteById_(
			session,
			idRoute,
			session.info.webId
		);
		const location = await getLocationById(
			session,
			idLocation,

			session.info.webId
		);
		if (route === null) {
			throw new Error("No se han encontrado rutas con esa id");
		}

		if (location === null) {
			throw new Error("No se han encontrado localizaciones con esa id");
		}
		route.deleteLocation(location.id);
		await addRoute_(session, route, session.info.webId);
		return route;
	} catch (err) {
		throw new Error("Problema borrando la localización de la ruta");
	}
}

export {
	getAllRoutes,

	getRouteById,
	addRoute,
	updateRoute,
	deleteRoute,
	addLocationToRoute,
	deleteLocationFromRoute,

	getAllLocationsByRouteId,
};
