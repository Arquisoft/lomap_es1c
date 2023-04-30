import{
	getAllRoutes,
	getRouteById,
	addRoute,
	updateRoute,
	deleteRoute,
	addLocationToRoute,
	deleteLocationFromRoute,
	getAllLocationsByRouteId,
} from "../../controllers/RouteController"

import Route from "../../models/Route"
import {
	createStruct as solidcreateStruct,
	saveLocation as solidsaveLocation,
	getAllLocations as solidgetAllLocations,
	getLocationById as solidgetLocationById,
	deleteLocationById as soliddeleteLocationById,
	deleteReviewById as soliddeleteReviewById,
	deletePhotoById as  soliddeletePhotoById,
	addRoute as solidaddRoute,
	getAllRoutes as solidgetAllRoutes,
	getRouteById as solidgetRouteById,
	deleteRouteById as soliddeleteRouteById,
	aceptarSolicitud as solidaceptarSolicitud,
	getAllFriends as solidgetAllFriends,
	deleteFriendById as soliddeleteFriendById,
	getCategories as solidgetCategories,
	denegarSolicitud as soliddenegarSolicitud,
	mandarSolicitud as solidmandarSolicitud,
	getAllSolicitudes as solidgetAllSolicitudes,
	updateReview as solidupdateReview,
	updatePhoto as solidupdatePhoto
} from "../../solid/Solid.js";








jest.mock("../../solid/Solid.js");

jest.disableAutomock();
describe("getAllRoutes() function", () => {
	it("should return all routes", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const routes = [{}, {}, {}];
		solidgetAllRoutes.mockResolvedValue(routes);

		const result = await getAllRoutes(session);

		expect(result).toEqual(routes);
	});

	it("should throw an error if there is a problem getting the routes", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const error = new Error("Problema al obtener las rutas");
		solidgetAllRoutes.mockRejectedValue(error);
		await expect(getAllRoutes(session)).rejects.toThrow(error);
	});
});

describe("getRouteById() function", () => {
	it("should return the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const route = ["ruta"];
		solidgetRouteById.mockResolvedValue(route);

		const result = await getRouteById(session, "1");
		expect(result).toEqual(route);
	});

	it("should throw an error if the route is not found", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		solidgetRouteById.mockResolvedValue(null);
		await expect(getRouteById(session, "1")).rejects.toThrow(
			"Problema al obtener la ruta"
		);
	});

	it("should throw an error if there is a problem getting the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const error = new Error("Problema al obtener la ruta");
		solidgetRouteById.mockRejectedValue(error);

		await expect(getRouteById(session, "1")).rejects.toThrow(
			error
		);
	});
});

describe("getAllLocationsByRouteId() function", () => {
	it("should return the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const route = { locations: ["location1", "location2"] };
		solidgetRouteById.mockResolvedValue(route);

		const result = await getAllLocationsByRouteId(session, "1");
		expect(result).toEqual(route.locations);
	});

	it("should throw an error if the route is not found", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		solidgetRouteById.mockResolvedValue(null);
		await expect(
			getAllLocationsByRouteId(session, "1")
		).rejects.toThrow("Problema al obtener la ruta");
	});

	it("should throw an error if there is a problem getting the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const error = new Error("Problema al obtener la ruta");
		solidgetRouteById.mockRejectedValue(error);

		await expect(
			getAllLocationsByRouteId(session, "1")
		).rejects.toThrow(error);
	});
});

describe("addRoute() function", () => {
	it("should return the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		const route = new Route(data.name, data.description, session.info.webId);

		const result = await addRoute(session, data);
		expect(result.name).toEqual(route.name);
		expect(result.description).toEqual(route.description);
		expect(result.author).toEqual(route.author);
	});

	it("should throw an error if the route name is not found", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { description: "ruta de prueba" };
		await expect(addRoute(session, data)).rejects.toThrow(
			"Problema al crear la ruta"
		);
	});

	it("should throw an error if there is a problem adding the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		solidaddRoute.mockRejectedValue("Error");

		await expect(addRoute(session, data)).rejects.toThrow(
			"Problema al crear la ruta"
		);
	});
});

describe("updateRoute() function", () => {
	it("should update the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		const route = new Route(data.name, data.description, session.info.webId);
		const newData = { name: "ruta2", description: "ruta de prueba2" };
		solidgetRouteById.mockResolvedValue(route);
		solidaddRoute.mockResolvedValue(route);
		const result = await updateRoute(
			session,
			route.id,
			newData
		);
		expect(result.name).toEqual(newData.name);
		expect(result.description).toEqual(newData.description);
		expect(result.author).toEqual(route.author);
	});

	it("should throw an error if the route is not found", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { description: "ruta de prueba" };
		solidgetRouteById.mockResolvedValue(null);
		await expect(
			updateRoute(session, "1", data)
		).rejects.toThrow("Problema al actualizar la ruta");
	});

	it("should throw an error if there is a problem updating the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		solidgetRouteById.mockRejectedValue("Error");

		await expect(updateRoute(session, data)).rejects.toThrow(
			"Problema al actualizar la ruta"
		);
	});
});

describe("deleteRoute() function", () => {
	it("should delete the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		const route = new Route(data.name, data.description, session.info.webId);
		solidgetRouteById.mockResolvedValue(route);
		soliddeleteRouteById.mockResolvedValue(true);
		const result = await deleteRoute(session, route.id);
		expect(result).toEqual(route);
	});

	it("should throw an error if the route is not found", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		const route = new Route(data.name, data.description, session.info.webId);
		soliddeleteRouteById.mockResolvedValue(true);
		solidgetRouteById.mockResolvedValue(null);
		await expect(deleteRoute(session, "1")).rejects.toThrow(
			"Problema al eliminar la ruta"
		);
	});

	it("should throw an error if there is a problem deleting the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		const route = new Route(data.name, data.description, session.info.webId);
		solidgetRouteById.mockResolvedValue(route);
		soliddeleteRouteById.mockRejectedValue("Error");

		await expect(deleteRoute(session, "1")).rejects.toThrow(
			"Problema al eliminar la ruta"
		);
	});
});

describe("addLocationToRoute() function", () => {
	it("should add the location to the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		const route = new Route(data.name, data.description, session.info.webId);
		const location = { dato: "una localizacion" };
		solidgetRouteById.mockResolvedValue(route);
		solidgetLocationById.mockResolvedValue(location);
		solidaddRoute.mockResolvedValue(true);
		route.addLocation(location);
		const result = await addLocationToRoute(
			session,
			route.id,
			"1"
		);
		expect(result).toEqual(route);
	});

	it("should throw an error if the route is not found", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		const route = new Route(data.name, data.description, session.info.webId);
		const location = { dato: "una localizacion" };
		solidgetRouteById.mockResolvedValue(null);
		solidgetLocationById.mockResolvedValue(location);
		solidaddRoute.mockResolvedValue(true);
		await expect(
			addLocationToRoute(session, route.id, "1")
		).rejects.toThrow("Problema añadiendo la localización a la ruta");
	});

	it("should throw an error if there is a problem adding the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		const route = new Route(data.name, data.description, session.info.webId);
		const location = { dato: "una localizacion" };
		solidgetRouteById.mockResolvedValue(null);
		solidgetLocationById.mockResolvedValue(location);
		solidaddRoute.mockRejectedValue("Error");

		await expect(
			addLocationToRoute(session, "1")
		).rejects.toThrow("Problema añadiendo la localización a la ruta");
	});
});

describe("deleteLocationFromRoute() function", () => {
	it("should delete the location to the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		const route = new Route(data.name, data.description, session.info.webId);
		const routeCopy = route;

		const location = { dato: "una localizacion" };
		route.addLocation(location);
		solidgetRouteById.mockResolvedValue(route);
		solidgetLocationById.mockResolvedValue(location);
		solidaddRoute.mockResolvedValue(true);

		const result = await deleteLocationFromRoute(
			session,
			route.id,
			"1"
		);
		expect(result).toEqual(routeCopy);
	});

	it("should throw an error if the route is not found", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		const route = new Route(data.name, data.description, session.info.webId);
		const location = { dato: "una localizacion" };
		solidgetRouteById.mockResolvedValue(null);
		solidgetLocationById.mockResolvedValue(location);
		solidaddRoute.mockResolvedValue(true);
		await expect(
			deleteLocationFromRoute(session, route.id, "1")
		).rejects.toThrow("Problema borrando la localización de la ruta");
	});

	it("should throw an error if there is a problem deleting the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		const route = new Route(data.name, data.description, session.info.webId);
		const location = { dato: "una localizacion" };
		solidgetRouteById.mockResolvedValue(null);
		solidgetLocationById.mockResolvedValue(location);
		solidaddRoute.mockRejectedValue("Error");

		await expect(
			deleteLocationFromRoute(session, "1")
		).rejects.toThrow("Problema borrando la localización de la ruta");
	});
});
/*
describe("changeOrderOfLocationInRoute() function", () => {
	it("should change the order of the location in the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		const route = new Route(data.name, data.description, session.info.webId);
		const routeCopy = route;

		const location = { dato: "una localizacion" };
		const location2 = { dato: "una localizacion mas" };
		route.addLocation(location);
		route.addLocation(location2);
		solidgetRouteById.mockResolvedValue(route);
		solidgetLocationById.mockResolvedValue(location);
		solidaddRoute.mockResolvedValue(true);

		const result = await changeOrderOfLocationInRoute(
			session,
			route.id,
			"1",
			"1"
		);
		expect(result).toEqual(routeCopy);
	});

	it("should throw an error if the route is not found", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		const route = new Route(data.name, data.description, session.info.webId);
		const location = { dato: "una localizacion" };
		solidgetRouteById.mockResolvedValue(null);
		solidgetLocationById.mockResolvedValue(location);
		solidaddRoute.mockResolvedValue(true);
		await expect(
			deleteLocationFromRoute(session, route.id, "1")
		).rejects.toThrow("Problema borrando la localización de la ruta");
	});

	it("should throw an error if there is a problem saving the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		const route = new Route(data.name, data.description, session.info.webId);
		const location = { dato: "una localizacion" };
		solidgetRouteById.mockResolvedValue(null);
		solidgetLocationById.mockResolvedValue(location);
		solidaddRoute.mockRejectedValue("Error");

		await expect(
			deleteLocationFromRoute(session, "1")
		).rejects.toThrow("Problema borrando la localización de la ruta");
	});
});
*/
