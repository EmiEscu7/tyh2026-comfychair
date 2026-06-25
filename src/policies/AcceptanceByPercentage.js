const AcceptancePolicy = require("./AcceptancePolicy");

class AcceptanceByPercentage extends AcceptancePolicy {
    constructor() {
        super();
        this._percentage = 0;
    }

    setPercentage(percentage) {
        if (percentage < 0 || percentage > 100)
            throw new Error("El porcentaje de aceptación debe estar entre 0 y 100.");
        this._percentage = percentage;
    }

    percentage() {
        return this._percentage;
    }

    calcularCantidadAAceptar(totalPapers) {
        return Math.floor(totalPapers * (this._percentage / 100));
    }

    seleccionarArticulos(papers) {
        let ordenados = [...papers];
        ordenados.sort(function(a, b) { return b.finalScore() - a.finalScore(); });

        let cantidadAAceptar = Math.floor(papers.length * (this._percentage / 100));
        let cantidadAceptados = 0;

        for (let i = 0; i < ordenados.length; i++) {
            let paper = ordenados[i];
            if (cantidadAceptados < cantidadAAceptar && paper.finalScore() >= 1) {
                paper.acceptPaper();
                cantidadAceptados = papers.filter(function(p) { return p.isAccepted() === true; }).length;
            } else {
                paper.declinePaper();
            }
        }

        return papers.filter(function(p) { return p.isAccepted() === true; });
    }
}

module.exports = AcceptanceByPercentage;
