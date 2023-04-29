const solid = require("../../solid/Solid.js");
const Route = require("../../models/Route.js");
jest.mock("../../solid/Solid.js");

describe("getAllRoutes() function", () => {
	it("should return all routes", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const routes = [{}, {}, {}];
		solid.getAllRoutes.mockResolvedValue(routes);

		const result = await solid.getAllRoutes(session, session.info.webId);

		expect(result).toEqual(routes);
		expect(solid.getAllRoutes).toHaveBeenCalledWith(
			session,
			session.info.webId
		);
	});

	it("should throw an error if there is a problem", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const errorMessage = "Error";
		solid.getAllRoutes.mockRejectedValue(new Error(errorMessage));

		await expect(
			solid.getAllRoutes(session, session.info.webId)
		).rejects.toThrow(errorMessage);
	});
});

describe("getRouteById() function", () => {
	it("should return the route with the given ID", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const id = "1";
		const route = new Route("name", "description", "webId");
		solid.getRouteById.mockResolvedValue(route);

		const result = await solid.getRouteById(session, id, session.info.webId);

		expect(result).toEqual(route);
		expect(solid.getRouteById).toHaveBeenCalledWith(
			session,
			id,
			session.info.webId
		);
	});

	it("should throw an error if the route ID is not found", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const id = "1";
		const errorMessage = "No route found with that ID";
		solid.getRouteById.mockResolvedValue([]);

		const result = await solid.getRouteById(session, id, session.info.webId);
		expect(result).toEqual([]);
		expect(solid.getRouteById).toHaveBeenCalledWith(
			session,
			id,
			session.info.webId
		);
	});

	it("should throw an error if there is a problem", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const id = "1";
		const errorMessage = "Error";
		solid.getRouteById.mockRejectedValue(new Error(errorMessage));

		await expect(
			solid.getRouteById(session, id, session.info.webId)
		).rejects.toThrow(errorMessage);
		expect(solid.getRouteById).toHaveBeenCalledWith(
			session,
			id,
			session.info.webId
		);
	});

	describe("addRoute function", () => {
		it("should add a new route", async () => {
			const session = { info: { webId: "https://example.com/johndoe" } };
			const name = "My Route";
			const description = "This is my route";

			const newRoute = new Route(name, description, session.info.webId);
			solid.addRoute.mockResolvedValue(newRoute);

			const result = await solid.addRoute(
				session,
				newRoute,
				session.info.webId
			);

			expect(result).toEqual(newRoute);
			expect(solid.addRoute).toHaveBeenCalledWith(
				session,
				newRoute,
				session.info.webId
			);
		});

		it("should throw an error if there is a problem", async () => {
			const session = { info: { webId: "https://example.com/johndoe" } };
			const name = "My Route";
			const description = "This is my route";
			const errorMessage = "Error";
			solid.addRoute.mockRejectedValue(new Error(errorMessage));
			const newRoute = new Route(name, description, session.info.webId);
			await expect(
				solid.addRoute(session, newRoute, session.info.webId)
			).rejects.toThrow(errorMessage);
		});
	});
});

describe("deleteRoute function", () => {
	it("should delete a route with the given ID", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const id = "1";
		solid.deleteRouteById.mockResolvedValue(null);

		await solid.deleteRouteById(session, id, session.info.webId);

		expect(solid.deleteRouteById).toHaveBeenCalledWith(
			session,
			id,
			session.info.webId
		);
	});

	it("should throw an error if there is a problem", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const id = "1";
		const errorMessage = "Error";
		solid.deleteRouteById.mockRejectedValue(new Error(errorMessage));

		await expect(
			solid.deleteRouteById(session, id, session.info.webId)
		).rejects.toThrow(errorMessage);
	});
});

describe("updateRoute function", () => {
	it("should update the route with the given ID and return it", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const id = "1";
		const newRouteData = { name: "newName", description: "newDescription" };
		const updatedRoute = new Route(
			"newName",
			"newDescription",
			session.info.webId,
			id
		);
		solid.updateRoute.mockResolvedValue(updatedRoute);

		const result = await solid.updateRoute(session, id, newRouteData);

		expect(result).toEqual(updatedRoute);
		expect(solid.updateRoute).toHaveBeenCalledWith(
			session,
			id,
			newRouteData,
			session.info.webId
		);
	});

	it("should throw an error if there is a problem updating the route", async () => {
		const session = {};
		const id = "1";
		const newRouteData = { name: "newName", description: "newDescription" };
		const errorMessage = "Error";
		solid.updateRoute.mockRejectedValue(new Error(errorMessage));

		await expect(solid.updateRoute(session, id, newRouteData)).rejects.toThrow(
			errorMessage
		);
		expect(solid.updateRoute).toHaveBeenCalledWith(
			session,
			id,
			newRouteData,
			session.info.webId
		);
	});
});

describe("addLocationToRoute function", () => {
	it("should add a new location to the route with the given ID and return the updated route", async () => {
		const session = {};
		const idRoute = "1";
		const newLocation = {
			name: "locationName",
			latitude: "10.12345",
			longitude: "20.12345",
		};
		const route = new Route("name", "description", "webId");
		route.locations = [{}, {}];
		const updatedRoute = new Route("name", "description", "webId");
		updatedRoute.locations = [{}, {}, newLocation];
		solid.getRouteById.mockResolvedValue(route);
		solid.updateRoute.mockResolvedValue(updatedRoute);

		const result = await solid.addLocationToRoute(
			session,
			idRoute,
			newLocation
		);

		expect(result).toEqual(updatedRoute);
		expect(solid.getRouteById).toHaveBeenCalledWith(
			session,
			idRoute,
			session.info.webId
		);
		expect(solid.updateRoute).toHaveBeenCalledWith(
			session,
			idRoute,
			{ locations: updatedRoute.locations },
			session.info.webId
		);
	});

	it("should throw an error if the route ID is not found", async () => {
		const session = {};
		const idRoute = "1";
		const newLocation = {
			name: "locationName",
			latitude: "10.12345",
			longitude: "20.12345",
		};
		const errorMessage = "No se han encontrado rutas con esa id";
		solid.getRouteById.mockResolvedValue(null);

		await expect(
			solid.addLocationToRoute(session, idRoute, newLocation)
		).rejects.toThrow(errorMessage);
		expect(solid.getRouteById).toHaveBeenCalledWith(
			session,
			idRoute,
			session.info.webId
		);
		expect(solid.updateRoute).not.toHaveBeenCalled();
	});
});
