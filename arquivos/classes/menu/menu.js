import { servicoPiloto, servicoAeronave, servicoAerovia, ocupacao, servicoPlano } from '../../../sistemadevoofase2.js'

export class Menu { 
    static #idAux = 0
    listarAerovias(origem, destino) {  
        return servicoAerovia.recupera(origem, destino)
    }
    listarAltitudesLivres(idAerovia, horario) { // listar altitudes livres em uma determinada aerovia em um determinado horário
        return 
    }
    aprovarPlanoDeVoo(plano) { // validações para encerrar a função caso ela não atenda aos requisitos
        const result = servicoPlano.consiste(plano) 
        if(result != true) {
            return result + ', plano não é consistente'
        }         
         // Os slots de horário necessários têm de estar livres.
        if(ocupacao.isOcupado(plano.idAerovia, plano.data, plano.altitude, plano.slots)) {
            return 'Slots ocupados!'
        }
        // plano aprovado, atribuir valores
        Menu.#idAux++ // um id vai ser criado toda vez que um plano der certo
        plano.idPlano = Menu.#idAux // o valor será atribuído ao plano pelo método set
        return ocupacao.ocupa(plano.idAerovia, plano.data, plano.altitude, plano.slots)
        
    }
    listarPlanos() {
        return servicoPlano.todos()
    }
    listarPlano(id) {
        return servicoPlano.recupera(id)
    }
    listarPlanoData(data) { // 5
        return ocupacao.planoPorData(data)
    }
    listarOcupacao(data, idAerovia) { // 6
        return ocupacao.ocupacaoAeroviaData(data, idAerovia)
    }
    cancelarPlano(idPlano) {
        const plano = servicoPlano.recuperaPlano(idPlano)
        if(typeof plano === 'string') {
            return plano
        }
        ocupacao.libera(plano.idAerovia, plano.data, plano.altitude, plano.slots)
        plano.cancelado = true
        return `Plano de id :${plano.id} cancelado!`
        
    }
}