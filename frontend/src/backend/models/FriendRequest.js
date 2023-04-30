class FriendRequest {
	constructor(sender, receiver, id = null, timestamp = null) {
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
