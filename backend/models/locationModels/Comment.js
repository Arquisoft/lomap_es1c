class Comment {
    constructor (author, comment, date) {
        if (!author) {
            throw new Error("Comment author must not be null");
        }
        this.author = author;
        this.comment = comment;
        this.date = date ? date : this.generateTimestamp();
    }
    generateTimestamp() {
        const currentDate = new Date().getTime();
        return `${currentDate}`;
    }
    updateComment(comment) {    
        this.comment = comment;
    }

}