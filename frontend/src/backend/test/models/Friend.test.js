import Friend from "../../models/Friend"

describe("Friend", () => {
	describe("constructor", () => {
		it("should create a new friend object with provided parameters", () => {
			const name = "John Doe";
			const webId = "https://example.com/johndoe";
			const id = "123456";
			const friend = new Friend(name, webId, id);
			expect(friend.name).toBe(name);
			expect(friend.webId).toBe(webId);
			expect(friend.id).toBe(id);
		});

		it("should create a new friend object with a generated ID when none is provided", () => {
			const name = "Jane Doe";
			const webId = "https://example.com/janedoe";
			const friend = new Friend(name, webId);
			expect(friend.name).toBe(name);
			expect(friend.webId).toBe(webId);
			expect(friend.id).toBeDefined();
		});

		it("should throw an error when webId is null or empty", () => {
			expect(() => new Friend("John Doe", null)).toThrow(
				"Web ID cannot be null or empty"
			);
			expect(() => new Friend("John Doe", "")).toThrow(
				"Web ID cannot be null or empty"
			);
		});
	});
	describe("updateName", () => {
		it("should update the name property", () => {
			const friend = new Friend("John", "https://example.com/john");
			friend.updateName("Jane");
			expect(friend.name).toBe("Jane");
		});
	});
});
