class FriendRequest {
	constructor(sender, receiver, id = null, timestamp = null) {
		if (!sender || sender.trim().length === 0) {
			throw new Error("Sender cannot be null or empty");
		}
		if (!receiver || receiver.trim().length === 0) {
			throw new Error("Receiver cannot be null or empty");
		}
		this.sender = sender;
		this.receiver = receiver;
		this.id = id ? id : this.generateRandomId();
		this.timestamp = timestamp ? timestamp : this.generateTimestamp();
	}
	generateRandomId() {
		const randomIdentifier = Math.random().toString(36).substring(2, 8);
		const currentDate = new Date().getTime();
		return `${currentDate}_${randomIdentifier}`;
	}
	generateTimestamp() {
		const currentDate = new Date().getTime();
		return `${currentDate}`;
	}
}
export default FriendRequest;
