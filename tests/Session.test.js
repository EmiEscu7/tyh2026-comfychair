const Session = require("../src/Session");
const User = require("../src/User");
const Paper = require("../src/Paper");
const {Bid, Interests} = require("../src/Bid");

let newSession;
let asse;
let juan, julian, matias;
let paper01, paper02, paper03;

beforeEach( ()=> {
    newSession = new Session();
    asse = new Session();
    juan = new User("Juan Gardey", "LIFIA, UNLP", "jgardey@lifia.ar", "123");
    julian = new User("Julián Grigera", "LIFIA, UNLP", "jgrigera@lifia.ar", "123");
    matias = new User("Matias Urbieta", "LIFIA, UNLP", "murbieta@lifia.ar", "123");
    paper01 = new Paper("A new approach on something", [juan, julian], juan);
    paper02 = new Paper("Another approach on something else", [matias, julian], matias);
    paper03 = new Paper("Yet another approach on something", [juan, matias], juan);
});

describe("A new Session", () =>{
    it("should have an empty name", ()=> {
        expect(newSession.name()).toBe("");
    })

    it("should have an empty Program Committee", ()=>{
        expect(newSession.programCommittee()).toHaveLength(0);
    })
})

describe("A Session", ()=>{
    it("should be able to add PC members.", ()=>{
        asse.addReviewer(juan);
        expect(asse.reviewers()).toContain(juan);
        expect(asse.reviewers()).toHaveLength(1);
    })
    it("should allow paper submissions", ()=>{
        expect(asse.canSubmit(paper01)).toBe(true);
        asse.submit(paper01);
        expect(asse.papers()).toContain(paper01);
    })
})

describe("During the bidding process, a Session", ()=>{
    it("should receive bids", ()=>{
        asse.closeSubmissions();
        asse.enterBid(paper02, juan, Interests.Interested);
        expect(asse.bidExistsFor(paper02, juan)).toBe(true);
        expect(asse.interestFor(paper02, juan)).toBe(Interests.Interested);
    })
    it("should allow overriding bids", ()=>{
        asse.closeSubmissions();
        asse.enterBid(paper02, juan, Interests.Interested);
        const secondBid = () => {asse.enterBid(paper02, juan, Interests.Maybe)};
        expect(secondBid).not.toThrow();
        expect(asse.interestFor(paper02, juan)).toBe(Interests.Maybe);
        expect(asse.bids()).toHaveLength(1);
    })
    it("should not allow to receive submissions", ()=>{
        asse.closeSubmissions();
        expect(asse.canSubmit(paper01)).toBe(false);
    })
    it("should fail to receive submissions", ()=>{
        asse.closeSubmissions();
        let submission = ()=>{asse.submit(paper01)};
        expect(submission).toThrow();
    })
})

describe("US1.1: Cálculo de la carga de revisiones por revisor", ()=>{
    it("con 4 artículos y 4 revisores, cada revisor tiene exactamente 3 revisiones", ()=>{
        let totalArticulos = 4;
        let totalRevisores = 4;
        let carga = newSession.calcularCargaDeRevisiones(totalArticulos, totalRevisores);

        expect(Object.keys(carga)).toHaveLength(4);
        expect(carga[0]).toBe(3);
        expect(carga[1]).toBe(3);
        expect(carga[2]).toBe(3);
        expect(carga[3]).toBe(3);
    })

    it("con 10 artículos y 7 revisores, distribuye el resto: 2 revisores con 5 y 5 con 4", ()=>{
        let totalArticulos = 10;
        let totalRevisores = 7;
        let carga = newSession.calcularCargaDeRevisiones(totalArticulos, totalRevisores);

        expect(Object.keys(carga)).toHaveLength(7);
        expect(carga[0]).toBe(5);
        expect(carga[1]).toBe(5);
        expect(carga[2]).toBe(4);
        expect(carga[3]).toBe(4);
        expect(carga[4]).toBe(4);
        expect(carga[5]).toBe(4);
        expect(carga[6]).toBe(4);
    })
})