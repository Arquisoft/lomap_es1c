const solid = require("../../solid/Solid.js");
const Route = require("../../models/Route.js");
const routeController = require("../../controllers/RouteController.js");
jest.mock("../../solid/Solid.js");

jest.disableAutomock();
describe("getAllRoutes() function", () => {
	it("should return all routes", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const routes = [{}, {}, {}];
		solid.getAllRoutes.mockResolvedValue(routes);

		const result = await routeController.getAllRoutes(session);

		expect(result).toEqual(routes);
	});

	it("should throw an error if there is a problem getting the routes", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const error = new Error("Problema al obtener las rutas");
		solid.getAllRoutes.mockRejectedValue(error);
		await expect(routeController.getAllRoutes(session)).rejects.toThrow(error);
	});
});

describe("getRouteById() function", () => {
	it("should return the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const route = ["ruta"];
		solid.getRouteById.mockResolvedValue(route);

		const result = await routeController.getRouteById(session, "1");
		expect(result).toEqual(route);
	});

	it("should throw an error if the route is not found", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		solid.getRouteById.mockResolvedValue(null);
		await expect(routeController.getRouteById(session, "1")).rejects.toThrow(
			"Problema al obtener la ruta"
		);
	});

	it("should throw an error if there is a problem getting the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const error = new Error("Problema al obtener la ruta");
		solid.getRouteById.mockRejectedValue(error);

		await expect(routeController.getRouteById(session, "1")).rejects.toThrow(
			error
		);
	});
});

describe("getAllLocationsByRouteId() function", () => {
	it("should return the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const route = { locations: ["location1", "location2"] };
		solid.getRouteById.mockResolvedValue(route);

		const result = await routeController.getAllLocationsByRouteId(session, "1");
		expect(result).toEqual(route.locations);
	});

	it("should throw an error if the route is not found", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		solid.getRouteById.mockResolvedValue(null);
		await expect(
			routeController.getAllLocationsByRouteId(session, "1")
		).rejects.toThrow("Problema al obtener la ruta");
	});

	it("should throw an error if there is a problem getting the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const error = new Error("Problema al obtener la ruta");
		solid.getRouteById.mockRejectedValue(error);

		await expect(
			routeController.getAllLocationsByRouteId(session, "1")
		).rejects.toThrow(error);
	});
});

describe("addRoute() function", () => {
	it("should return the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		const route = new Route(data.name, data.description, session.info.webId);

		const result = await routeController.addRoute(session, data);
		expect(result.name).toEqual(route.name);
		expect(result.description).toEqual(route.description);
		expect(result.author).toEqual(route.author);
	});

	it("should throw an error if the route name is not found", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { description: "ruta de prueba" };
		await expect(routeController.addRoute(session, data)).rejects.toThrow(
			"Problema al crear la ruta"
		);
	});

	it("should throw an error if there is a problem adding the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		solid.addRoute.mockRejectedValue("Error");

		await expect(routeController.addRoute(session, data)).rejects.toThrow(
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
		solid.getRouteById.mockResolvedValue(route);
		solid.addRoute.mockResolvedValue(route);
		const result = await routeController.updateRoute(
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
		solid.getRouteById.mockResolvedValue(null);
		await expect(
			routeController.updateRoute(session, "1", data)
		).rejects.toThrow("Problema al actualizar la ruta");
	});

	it("should throw an error if there is a problem updating the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		solid.getRouteById.mockRejectedValue("Error");

		await expect(routeController.updateRoute(session, data)).rejects.toThrow(
			"Problema al actualizar la ruta"
		);
	});
});

describe("deleteRoute() function", () => {
	it("should delete the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		const route = new Route(data.name, data.description, session.info.webId);
		solid.getRouteById.mockResolvedValue(route);
		solid.deleteRouteById.mockResolvedValue(true);
		const result = await routeController.deleteRoute(session, route.id);
		expect(result).toEqual(route);
	});

	it("should throw an error if the route is not found", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		const route = new Route(data.name, data.description, session.info.webId);
		solid.deleteRouteById.mockResolvedValue(true);
		solid.getRouteById.mockResolvedValue(null);
		await expect(routeController.deleteRoute(session, "1")).rejects.toThrow(
			"Problema al eliminar la ruta"
		);
	});

	it("should throw an error if there is a problem deleting the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		const route = new Route(data.name, data.description, session.info.webId);
		solid.getRouteById.mockResolvedValue(route);
		solid.deleteRouteById.mockRejectedValue("Error");

		await expect(routeController.deleteRoute(session, "1")).rejects.toThrow(
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
		solid.getRouteById.mockResolvedValue(route);
		solid.getLocationById.mockResolvedValue(location);
		solid.addRoute.mockResolvedValue(true);
		route.addLocation(location);
		const result = await routeController.addLocationToRoute(
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
		solid.getRouteById.mockResolvedValue(null);
		solid.getLocationById.mockResolvedValue(location);
		solid.addRoute.mockResolvedValue(true);
		await expect(
			routeController.addLocationToRoute(session, route.id, "1")
		).rejects.toThrow("Problema añadiendo la localización a la ruta");
	});

	it("should throw an error if there is a problem adding the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		const route = new Route(data.name, data.description, session.info.webId);
		const location = { dato: "una localizacion" };
		solid.getRouteById.mockResolvedValue(null);
		solid.getLocationById.mockResolvedValue(location);
		solid.addRoute.mockRejectedValue("Error");

		await expect(
			routeController.addLocationToRoute(session, "1")
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
		solid.getRouteById.mockResolvedValue(route);
		solid.getLocationById.mockResolvedValue(location);
		solid.addRoute.mockResolvedValue(true);

		const result = await routeController.deleteLocationFromRoute(
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
		solid.getRouteById.mockResolvedValue(null);
		solid.getLocationById.mockResolvedValue(location);
		solid.addRoute.mockResolvedValue(true);
		await expect(
			routeController.deleteLocationFromRoute(session, route.id, "1")
		).rejects.toThrow("Problema borrando la localización de la ruta");
	});

	it("should throw an error if there is a problem deleting the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		const route = new Route(data.name, data.description, session.info.webId);
		const location = { dato: "una localizacion" };
		solid.getRouteById.mockResolvedValue(null);
		solid.getLocationById.mockResolvedValue(location);
		solid.addRoute.mockRejectedValue("Error");

		await expect(
			routeController.deleteLocationFromRoute(session, "1")
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
		solid.getRouteById.mockResolvedValue(route);
		solid.getLocationById.mockResolvedValue(location);
		solid.addRoute.mockResolvedValue(true);

		const result = await routeController.changeOrderOfLocationInRoute(
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
		solid.getRouteById.mockResolvedValue(null);
		solid.getLocationById.mockResolvedValue(location);
		solid.addRoute.mockResolvedValue(true);
		await expect(
			routeController.deleteLocationFromRoute(session, route.id, "1")
		).rejects.toThrow("Problema borrando la localización de la ruta");
	});

	it("should throw an error if there is a problem saving the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "ruta", description: "ruta de prueba" };
		const route = new Route(data.name, data.description, session.info.webId);
		const location = { dato: "una localizacion" };
		solid.getRouteById.mockResolvedValue(null);
		solid.getLocationById.mockResolvedValue(location);
		solid.addRoute.mockRejectedValue("Error");

		await expect(
			routeController.deleteLocationFromRoute(session, "1")
		).rejects.toThrow("Problema borrando la localización de la ruta");
	});
});
*/
