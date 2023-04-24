const Friend = require("../../models/Friend");

describe("Friend", () => {
	// Test case for creating a new Friend object
	it("should create a new Friend object", () => {
		const friend = new Friend("John Doe", "john.doe@example.com");
		expect(friend.name).toEqual("John Doe");
		expect(friend.webId).toEqual("john.doe@example.com");
	});

	// Test case for updating the name of a Friend object
	it("should update the name of a Friend object", () => {
		const friend = new Friend("John Doe", "john.doe@example.com");
		friend.updateName("Jane Doe");
		expect(friend.name).toEqual("Jane Doe");
	});

	// Test case for generating a random ID for a Friend object
	it("should generate a random ID for a Friend object", () => {
		const friend = new Friend("John Doe", "john.doe@example.com");
		expect(friend.id).toBeTruthy();
	});

	// Test case for throwing an error when the webId is null or empty
	it("should throw an error when the webId is null or empty", () => {
		expect(() => new Friend("John Doe", "")).toThrow(Error);
		expect(() => new Friend("John Doe", null)).toThrow(Error);
	});
});
