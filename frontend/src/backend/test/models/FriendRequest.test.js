import FriendRequest from "../../models/FriendRequest"

describe("FriendRequest", () => {
	describe("constructor", () => {
		it("should create a FriendRequest object with the correct properties when all parameters are provided", () => {
			// Arrange
			const sender = "John";
			const receiver = "Jane";
			const id = "abcd1234";
			const timestamp = "1645825200000";

			// Act
			const friendRequest = new FriendRequest(sender, receiver, id, timestamp);

			// Assert
			expect(friendRequest.sender).toEqual(sender);
			expect(friendRequest.receiver).toEqual(receiver);
			expect(friendRequest.id).toEqual(id);
			expect(friendRequest.timestamp).toEqual(timestamp);
		});

		it("should create a FriendRequest object with a generated ID and timestamp when no ID and timestamp are provided", () => {
			// Arrange
			const sender = "John";
			const receiver = "Jane";

			// Act
			const friendRequest = new FriendRequest(sender, receiver);

			// Assert
			expect(friendRequest.sender).toEqual(sender);
			expect(friendRequest.receiver).toEqual(receiver);
			expect(friendRequest.id).not.toBeNull();
			expect(friendRequest.timestamp).not.toBeNull();
		});

		it("should throw an error if sender parameter is missing or empty", () => {
			// Arrange
			const sender = "";
			const receiver = "Jane";

			// Act + Assert
			expect(() => new FriendRequest(sender, receiver)).toThrow(
				"Sender cannot be null or empty"
			);
		});

		it("should throw an error if receiver parameter is missing or empty", () => {
			// Arrange
			const sender = "John";
			const receiver = "";

			// Act + Assert
			expect(() => new FriendRequest(sender, receiver)).toThrow(
				"Receiver cannot be null or empty"
			);
		});

		// Additional tests can be added to test edge cases or other scenarios
	});
});
