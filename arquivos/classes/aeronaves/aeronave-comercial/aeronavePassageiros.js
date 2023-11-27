import { AeronaveComercial } from '../aeronaveComercial.js'

export class AeronavePassageiros extends AeronaveComercial {
    #maxPassageiros;
  
    constructor( prefixo, velocidadeCruzeiro, autonomia,nomeCIA, maxPassageiros) {
      super(nomeCIA, prefixo, velocidadeCruzeiro, autonomia);
      this.#maxPassageiros = maxPassageiros;
    }
    returnInfo() {  // retorno das informações da aeronave de passageiros
      return `${super.returnInfo()}, máximo de passageiros: ${this.#maxPassageiros}`;
    }
  }