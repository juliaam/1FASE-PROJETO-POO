export class PlanoDeVoo {
    #id
    #matriculaPiloto
    #idAerovia
    #prefixoAeronave
    #data
    #horario
    #altitude
    #slots // []
    #cancelado

    constructor(matPiloto, idAerovia, data, horario, altitude, slots, prefixoAeronave) {
        this.#matriculaPiloto = matPiloto
        this.#idAerovia = idAerovia
        this.#prefixoAeronave = prefixoAeronave
        this.#data = data
        this.#horario = horario
        this.#altitude = altitude
        this.#slots = slots
        this.#cancelado = false
    }
    get id() {
        return this.#id
    }
    get matPiloto() {
        return this.#matriculaPiloto
    }
    get idAerovia () {
        return this.#idAerovia
    }
    get prefixoAeronave() {
        return this.#prefixoAeronave
    }
    get altitude() {
        return this.#altitude
    }
    get data() {
        return this.#data
    }
    get horario() {
        return this.#horario
    }
    get slots() {
        return this.#slots
    }
    get cancelado() {
        return this.#cancelado
    }
    set idPlano(id) {
        this.#id = id
    }
    set cancelado(boolean) {
        this.#cancelado = boolean
    }
    toString() {
        return `Plano de id: ${this.id? this.id : 'Não possui'}, matrícula do piloto: ${this.matPiloto}, id da aerovia: ${this.idAerovia}
        prefixo de aeronave: ${this.prefixoAeronave}, data: ${this.data}, horário: ${this.horario}, altitude: ${this.altitude}
        slots: ${this.slots}, cancelado? ${this.cancelado}`
    }
}