    export class OcupacaoAerovia {
        #aeroviasOcupadas = []
        get aeroviasOcupadas() {
            return this.#aeroviasOcupadas
        }
        altitudesOcupadas(idAerovia, data) { // faz um mapeamento das altitudes de aerovias ocupadas
            return this.#aeroviasOcupadas
            .filter(x => x.idAerovia === idAerovia && x.data === data)
            .map(x => ({Altitude: x.altitude, idAerovia: x.idAerovia}))
        }
        slotsOcupados(idAerovia, data, altitude) {
            return this.#aeroviasOcupadas
            .filter(x => x.idAerovia === idAerovia && x.data === data, x.altitude === altitude)
            .map(x => ({Slots: x.slots, idAerovia: x.idAerovia}))
        }
        ocupa(idAerovia, data, altitude, slot){
            const aeroviaOcupada = {idAerovia: idAerovia, data: data, altitude: altitude, slots: slot}
            return this.#aeroviasOcupadas.push(aeroviaOcupada)
        }
        libera(idAerovia, data, altitude, slot) { // verificar posteriormente
            const aeroviaOcupada = {idAerovia: idAerovia, data: data, altitude: altitude, slots: slot}
            const index = this.#aeroviasOcupadas.indexOf(aeroviaOcupada)
            if (index = -1) {
                return 'Não há aerovia ocupada com esses dados'
            }
            return this.#aeroviasOcupadas.splice(index, 1)
        }
        isOcupado(idAerovia, data, altitude, slots) {
            const item = this.#aeroviasOcupadas.find(x => 
                x.idAerovia === idAerovia &&
                x.data.toISOString().split('T')[0] === data.toISOString().split('T')[0] &&
                x.altitude === altitude &&
                x.slots.some((slot) => slots.includes(slot))
                )
            if(item) {
                return true
            }
            return false
        }
        listarOcupacoes() {
            let aeroviaString = "";
            for (let aerovia of this.aeroviasOcupadas) {
                let string = `Aerovia - ID: ${aerovia.idAerovia}, Data: ${aerovia.data}, Altitude: ${aerovia.altitude}, Slots: ${aerovia.slots.join(",")}\n`;
                aeroviaString += string;
            }
            return aeroviaString;
        }
    }