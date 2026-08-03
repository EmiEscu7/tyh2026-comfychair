const SessionStage = require("./SessionStage");
const RevisionStage = require("./RevisionStage");
const Assigment = require("../Assigment");
const {Interests} = require("../Bid");

class AssigmentStage extends SessionStage{
    constructor(Session){
        super(Session);
    }

    closeStage(){
        let newStage = new RevisionStage(this._Session)
        this._Session.changeStage(newStage)
        return newStage
    }

    enterAssigment(paper, reviewer){
        if (!this._Session.assigmentExistsFor(paper, reviewer)){
            paper.addReviewerAssigned();
            reviewer.setPapersAssigned();
            let asignacion = new Assigment(paper, reviewer);
            this._Session.assignments().push(asignacion);
        }
        else throw new Error("Asignación ya existe para el par (paper,reviewer) ingresado.");        
    }

    interestPriority(interest){
        if(interest === Interests.Interested) return 2;
        if(interest === Interests.Maybe) return 1;
        return 0;
    }

    asignarRevisores() {
        this._Session.calculateWorkload();
        const candidates = this._Session.candidatesForAssignment()
            .sort((a, b) => b.interest - a.interest);

        for (const { paper, reviewer } of candidates) {
            if (paper.getReviewersAssigned() < 3 && reviewer.acceptPapers() && !reviewer.isAuthor(paper.authors())) {
                this.enterAssigment(paper, reviewer);
            }
        }
    }
}

module.exports = AssigmentStage;