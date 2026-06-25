const {Bid, Interests} = require("./Bid");
const Assigment = require("./Assigment");
const Review = require("./Review");
const ReceivingStage = require("./Stage/ReceivingStage")

class Session{
    constructor(){
        this._name = "";
        this._programCommittee=[];
        this._papers=[];
        this._bids=[];
        this._assignments=[];
        this._stage = new ReceivingStage(this);
        this._acceptancePercentage=0;
    }

    name(){
        return this._name;
    };

    programCommittee(){
        return this._programCommittee;
    };

    papers(){
        return this._papers;
    }

    bids(){
        return this._bids;
    }

    assignments(){
        return this._assignments
    }

    stage(){
        return this._stage
    }

    acceptancePercentage(){
        return this._acceptancePercentage;
    }

    changeStage(Stage){
        this._stage = Stage
    }

    setAcceptancePercentage(percentage){
        if (percentage < 0 || percentage > 100)
            throw new Error("El porcentaje de aceptación debe estar entre 0 y 100.");
        this._acceptancePercentage = percentage;
    }
    
    addReviewer(user){
        this._programCommittee.push(user);
    }
   
    assigmentsPapers(paper){
        let nCantAssigment = 0
        for(let i = 0; i < this._assignments.length; i++){
            if (this._assignments[i].paper() == paper) nCantAssigment += 1
        }
        return nCantAssigment
    }
    
    bidExistsFor(paper, reviewer){
        return typeof(this.bidFor(paper, reviewer)) != "undefined";
    }
    
    bidFor(paper, reviewer){
        return this._bids.find( (suspect) => (suspect.paper() == paper) && (suspect.reviewer()==reviewer) );
    }
    
    interestFor(paper, reviewer){
        return this.bidFor(paper, reviewer).interest();
    }
    
    interestOrDefaultFor(paper, reviewer){
        if(this.bidExistsFor(paper, reviewer))
            return this.interestFor(paper, reviewer);
        return Interests.NotInterested;
    }
    
    assigmentExistsFor(paper, reviewer){
        return typeof(this.assigmentFor(paper, reviewer)) != "undefined";
    }

    assigmentFor(paper, reviewer){
        return this._assignments.find( (suspect) => (suspect.paper() == paper) && (suspect.reviewer()==reviewer) );
    }

    calcularCargaDeRevisiones(){
        let totalArticulos = this.papers().length
        let totalRevisores = this.programCommittee().length
        let totalRevisiones = 3 * totalArticulos;
        let base = Math.floor(totalRevisiones / totalRevisores);
        let resto = totalRevisiones % totalRevisores;
        let carga = {};
        for (let i = 0; i < totalRevisores; i++){
            if (i < resto)
                carga[i] = base + 1;
            else
                carga[i] = base;
        }
        return carga;
    }

    cantidadArticulosAAceptar(){
        return Math.floor(this._papers.length * (this._acceptancePercentage / 100))
    }

}

module.exports = Session;