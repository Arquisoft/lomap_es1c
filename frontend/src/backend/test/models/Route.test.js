const Route = require("../../models/Route");

describe("Route", () => {
	describe("constructor", () => {
		it("should throw an error if name is null or empty", () => {
			expect(() => new Route(null, "description", "author")).toThrow(
				"Route name cannot be null or empty"
			);
			expect(() => new Route("", "description", "author")).toThrow(
				"Route name cannot be null or empty"
			);
			expect(() => new Route(undefined, "description", "author")).toThrow(
				"Route name cannot be null or empty"
			);
		});

		it("should throw an error if author is null or empty", () => {
			expect(() => new Route("name", "description", null)).toThrow(
				"Route author cannot be null or empty"
			);
			expect(() => new Route("name", "description", "")).toThrow(
				"Route author cannot be null or empty"
			);
			expect(() => new Route("name", "description", undefined)).toThrow(
				"Route author cannot be null or empty"
			);
		});

		it("should set the properties of the instance", () => {
			const id = "123";
			const name = "Test Route";
			const description = "This is a test route";
			const author = "John Doe";
			const locations = [{ id: "1", name: "Location 1" }];
			const route = new Route(name, description, author, id, locations);

			expect(route.id).toBe(id);
			expect(route.name).toBe(name);
			expect(route.description).toBe(description);
			expect(route.author).toBe(author);
			expect(route.locations).toEqual(locations);
		});

		it("should set the id property with a random id if not provided", () => {
			const route1 = new Route("name", "description", "author");
			const route2 = new Route("name", "description", "author");
			expect(route1.id).not.toBe(route2.id);
		});

		it("should set the locations property to an empty array if not provided", () => {
			const route = new Route("name", "description", "author");
			expect(route.locations).toEqual([]);
		});
	});

	describe("Route class methods", () => {
		let route;

		beforeEach(() => {
			route = new Route("Route 1", "Description of Route 1", "Author 1");
		});

		afterEach(() => {
			route = null;
		});

		describe("addLocation method", () => {
			it("should add a location to the route", () => {
				const location = { id: "123", name: "Location 1" };
				route.addLocation(location);
				expect(route.locations).toHaveLength(1);
				expect(route.locations[0]).toEqual(location);
			});
		});

		describe("deleteLocation method", () => {
			it("should delete a location from the route", () => {
				const location1 = { id: "123", name: "Location 1" };
				const location2 = { id: "456", name: "Location 2" };
				route.locations = [location1, location2];
				route.deleteLocation("123");
				expect(route.locations).toHaveLength(1);
				expect(route.locations[0]).toEqual(location2);
			});

			it("should throw an error if location is not found in the route", () => {
				expect(() => route.deleteLocation("123")).toThrow(
					"Location not found in route"
				);
			});
		});

		describe("changeOrder method", () => {
			it("should change the order of a location in the route", () => {
				const location1 = { id: "123", name: "Location 1" };
				const location2 = { id: "456", name: "Location 2" };
				const location3 = { id: "789", name: "Location 3" };
				route.locations = [location1, location2, location3];
				route.changeOrder(location2, 0);
				expect(route.locations).toEqual([location2, location1, location3]);
			});

			it("should throw an error if location is not found in the route", () => {
				expect(() =>
					route.changeOrder({ id: "999", name: "Location 999" }, 0)
				).toThrow("Location not found in route");
			});
		});
	});
});
describe("Route class methods", () => {
	let route;

	beforeEach(() => {
		route = new Route("Route 1", "Description of Route 1", "Author 1");
	});

	afterEach(() => {
		route = null;
	});

	describe("addLocation method", () => {
		it("should add a location to the route", () => {
			const location = { id: "123", name: "Location 1" };
			route.addLocation(location);
			expect(route.locations).toHaveLength(1);
			expect(route.locations[0]).toEqual(location);
		});
	});

	describe("deleteLocation method", () => {
		it("should delete a location from the route", () => {
			const location1 = { id: "123", name: "Location 1" };
			const location2 = { id: "456", name: "Location 2" };
			route.locations = [location1, location2];
			route.deleteLocation("123");
			expect(route.locations).toHaveLength(1);
			expect(route.locations[0]).toEqual(location2);
		});

		it("should throw an error if location is not found in the route", () => {
			expect(() => route.deleteLocation("123")).toThrow(
				"Location not found in route"
			);
		});
	});

	describe("changeOrder method", () => {
		it("should change the order of a location in the route", () => {
			const location1 = { id: "123", name: "Location 1" };
			const location2 = { id: "456", name: "Location 2" };
			const location3 = { id: "789", name: "Location 3" };
			route.locations = [location1, location2, location3];
			route.changeOrder(location2, 0);
			expect(route.locations).toEqual([location2, location1, location3]);
		});

		it("should throw an error if location is not found in the route", () => {
			expect(() =>
				route.changeOrder({ id: "999", name: "Location 999" }, 0)
			).toThrow("Location not found in route");
		});
	});
});
