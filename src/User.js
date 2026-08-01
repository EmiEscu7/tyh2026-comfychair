

class User{
    constructor(fullName, affiliation, email, password){
        let crypto = require('crypto');
        const hash = crypto.createHash('sha256');
        this.fullName = fullName;
        this.affiliation = affiliation;
        this.email = email;
        this.encryptedPassword = hash.update(password).digest('base64');
        this.papersAssigned = 0;
        this.workload = 1;
    }

    getEncryptedPassword(){
        return this.encryptedPassword;
    }

    setPapersAssigned(){
        this.papersAssigned++;
    }

    getPapersAssigned(){
        return this.papersAssigned;
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

module.exports = User;