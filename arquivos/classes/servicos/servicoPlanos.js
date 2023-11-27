import { servicoAeronave, servicoAerovia, servicoPiloto } from '../../../sistemadevoofase2.js'

export class ServicoPlanos {
  #planos = [];

  get planos() {
    return this.#planos.values();
  }
  todos() {
    let string = "";
    for (const plano of this.planos) {
      string += `${plano.toString()} \n`;
    }
    return string;
  }
  adicionarPlano(planoDeVoo) {
    this.#planos.push(planoDeVoo);
  }
  recuperaPlano(id) {
    const plano = this.#planos.find((plano) => plano.id === id);
    if (plano) {
      return plano
    }
    return "Não foi possível encontrar um plano para esse id";
  }
  recupera(id) {
    const plano = this.#planos.find((plano) => plano.id === id);
    if (plano) {
      return `ID: ${plano.id}, matricula do piloto: ${
        plano.matriculaPiloto
      }, ID aerovia: ${plano.idAerovia},
            data: ${plano.data}, horário: ${plano.horario}, altitude: ${
        plano.altitude
      }, slots: ${plano.slots} e cancelado: 
            ${plano.cancelado ? "Sim" : "Não"}`;
    }
    return "Não foi possível encontrar um plano para esse id";
  }
  consiste(plano) {
    const aeronave = servicoAeronave.recuperaAeronave(plano.prefixoAeronave);
    const aerovia = servicoAerovia.recuperaAerovia(plano.idAerovia);
    if(!aeronave) {
      return 'A aeronave fornecida não foi encontrada'
    }
    if(!aerovia) {
      return 'A aerovia fornecida não foi encontrada'
    }
    let tipoAeronave = "Comum";
    if (aeronave.respManutencao) {
      tipoAeronave = "Particular";
    }
    if (aeronave.nomeCIA) {
      if (aeronave.maxPassageiros) {
        tipoAeronave = "Passageiro";
      }
      if (aeronave.pesoMAX) {
        tipoAeronave = "Carga";
      }
    }
    // verificar se habilitação do piloto está ativa0
    if (!servicoPiloto.recuperaHabilitacaoAtiva(plano.matriculaPiloto)) {
      return "Habilitação não está ativa!";
    }
    // A aeronave tem de ter autonomia para voar o trecho (a autonomia tem de ser 10%
    // maior que o tamanho da aerovia);
    const porcentagem = aerovia.tamanho * 0.1
    if(aeronave.autonomia + porcentagem < aerovia.tamanho) {
      return "A autonomia deve ser 10% maior que o tamanho da aerovia";
    }

    // altitude dentro do padrão
    if (plano.altitude < 25000 || plano.altitude > 35000) {
      // verificar se a altitude está do tamanho permitido
      return "Altitude não permitida";
    }
    // A altitude escolhida tem de ser compatível com o tipo de aeronave;
    if (
      (tipoAeronave == "Passageiro" && plano.altitude < 28000) ||
      (tipoAeronave == "Particular" && plano.altitude > 27000)
    ) {
      return `Altitude não suportada para aeronave ${tipoAeronave}`
    }
    if(tipoAeronave === "Carga" && plano.hora > 0 && plano.hora < 6) {
      return 'Horário indisponível para a aeronave de carga'
    }
    return true;
  }
}
