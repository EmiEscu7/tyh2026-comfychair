const SessionStage = require("../SessionStage");

class SelectionStage extends SessionStage{
    constructor(Session){
        super(Session);
    }

    obtenerArticulosOrdenadosPorScore(){
        let ordenados = [...this._Session.papers()];
        ordenados.sort(function(a, b){ return b.finalScore() - a.finalScore(); });
        return ordenados;
    }

    obtenerArticulosAceptados(){
        let ordenados = this.obtenerArticulosOrdenadosPorScore()
        let cantidadArticulosAAceptar = this._Session.cantidadArticulosAAceptar()
        let cantidadArticulosAceptados = 0
        let paperOrigin
        for(let i = 0; i < ordenados.length; i++){
            paperOrigin = ordenados[i]
            if (cantidadArticulosAceptados < cantidadArticulosAAceptar && paperOrigin.finalScore() >= 1){
                paperOrigin.acceptPaper()
                cantidadArticulosAceptados = this._Session.papers().filter((suspect) => suspect.isAccepted() == true).length;
            } else {
                paperOrigin.declinePaper()
            }
        }
        return this._Session.papers().filter((suspect) => suspect.isAccepted() == true);
    }

}

module.exports = SelectionStage;