const User = require("./User");

class Reviewer extends User {
    constructor(fullName, affiliation, email, password){
        super(fullName, affiliation, email, password);
        this.papersAssigned = 0;
        this.workload = 1;
    }

    setWorkload(workload){
        if(workload > 0) {
            this.workload = workload;
        }
    }

    getWorkload(){
        return this.workload;
    }

    acceptPapers() {
        return this.papersAssigned < this.workload;
    }

    isAuthor(authors){
        return authors.includes(this);
    }
}

module.exports = Reviewer;