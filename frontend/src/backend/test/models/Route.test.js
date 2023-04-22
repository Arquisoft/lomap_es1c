const Route = require("../../models/Route");
describe("Route", () => {
	let route;

	beforeEach(() => {
		route = new Route("My Route", "This is my route", "John Doe");
	});

	describe("constructor", () => {
		it("should create a new route with the given properties", () => {
			expect(route.name).toBe("My Route");
			expect(route.description).toBe("This is my route");
			expect(route.author).toBe("John Doe");
			expect(route.locations).toEqual([]);
			expect(route.id).toBeTruthy();
		});

		it("should throw an error if the name is null or empty", () => {
			expect(() => new Route(null, "Description", "Author")).toThrow();
			expect(() => new Route("", "Description", "Author")).toThrow();
		});

		it("should throw an error if the author is null or empty", () => {
			expect(() => new Route("Name", "Description", null)).toThrow();
			expect(() => new Route("Name", "Description", "")).toThrow();
		});
	});

	describe("addLocation", () => {
		it("should add a location to the route", () => {
			const location = { id: "123", name: "Location 1" };
			route.addLocation(location);
			expect(route.locations).toContain(location);
		});
	});

	describe("deleteLocation", () => {
		it("should delete a location from the route", () => {
			const location1 = { id: "123", name: "Location 1" };
			const location2 = { id: "456", name: "Location 2" };
			route.addLocation(location1);
			route.addLocation(location2);
			route.deleteLocation(location1.id);
			expect(route.locations).not.toContain(location1);
			expect(route.locations).toContain(location2);
		});

		it("should throw an error if the location is not found", () => {
			expect(() => route.deleteLocation("123")).toThrow();
		});
	});

	describe("changeOrder", () => {
		it("should change the order of a location in the route", () => {
			const location1 = { id: "123", name: "Location 1" };
			const location2 = { id: "456", name: "Location 2" };
			const location3 = { id: "789", name: "Location 3" };
			route.addLocation(location1);
			route.addLocation(location2);
			route.addLocation(location3);
			route.changeOrder(location2, 0);
			expect(route.locations).toEqual([location2, location1, location3]);
		});

		it("should throw an error if the location is not found", () => {
			expect(() =>
				route.changeOrder({ id: "123", name: "Location 1" }, 0)
			).toThrow();
		});
	});
});
