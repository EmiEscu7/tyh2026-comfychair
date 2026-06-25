class AcceptancePolicy {
    seleccionarArticulos(papers) {
        throw new Error("Método abstracto: debe ser implementado por la subclase");
    }
}

module.exports = AcceptancePolicy;
