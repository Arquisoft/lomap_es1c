class Friend {
    constructor(name, webid) {
      this.name = name;
      if (!webid || webid.trim() === '') {
        throw new Error('Web ID cannot be null or empty');
      }
      this.webid = webid;
    }
  }

module.exports = Friend;