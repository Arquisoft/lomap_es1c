const Map = require("../../models/Map");

describe("Map", () => {
	describe("constructor", () => {
		it("should create a new map with a generated ID if none is provided", () => {
			const map = new Map("Test Map");
			expect(map.id).toBeDefined();
		});

		it("should create a new map with the provided ID", () => {
			const id = "test-id";
			const map = new Map("Test Map", id);
			expect(map.id).toBe(id);
		});

		it("should throw an error if no name is provided", () => {
			expect(() => new Map()).toThrow("Map name cannot be null or empty");
		});
	});

	describe("addLocation", () => {
		it("should add a location to the map", () => {
			const map = new Map("Test Map");
			const location = {
				name: "Test Location",
				lat: 0,
				lng: 0,
			};
			map.addLocation(location);
			expect(map.locations).toContain(location);
		});
	});

	describe("updateName", () => {
		it("should update the name of the map", () => {
			const map = new Map("Test Map");
			const newName = "New Map Name";
			map.updateName(newName);
			expect(map.name).toBe(newName);
		});
	});

	describe("generateRandomId", () => {
		it("should generate a random ID", () => {
			const map = new Map("Test Map");
			const id = map.generateRandomId();
			expect(id).toBeDefined();
		});
	});
});
