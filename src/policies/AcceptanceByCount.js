const AcceptancePolicy = require("./AcceptancePolicy");

class AcceptanceByCount extends AcceptancePolicy {
    constructor(maxCount) {
        super();
        this._maxCount = maxCount;
    }

    maxCount() {
        return this._maxCount;
    }

    seleccionarArticulos(papers) {
        let ordenados = [...papers];
        ordenados.sort(function(a, b) {
            let diff = b.finalScore() - a.finalScore();
            return diff !== 0 ? diff : 0;
        });

        for (let i = 0; i < ordenados.length; i++) {
            if (i < this._maxCount) {
                ordenados[i].acceptPaper();
            } else {
                ordenados[i].declinePaper();
            }
        }

        return papers.filter(function(p) { return p.isAccepted() === true; });
    }
}

module.exports = AcceptanceByCount;
