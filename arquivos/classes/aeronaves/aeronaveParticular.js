import { Aeronave } from './aeronave.js'

export class AeronaveParticular extends Aeronave {
    #respManutencao;
  
    constructor(prefixo, velocidadeCruzeiro, autonomia, respManutencao) {
      super(prefixo, velocidadeCruzeiro, autonomia);
      this.#respManutencao = respManutencao;
    }
    get respManutencao() {
      return this.#respManutencao;
    }
    returnInfo() { //  // retorno das informações da aeronave particular
      return `${super.returnInfo()}, responsável pela manutenção: ${this.respManutencao}`;
    }
  }