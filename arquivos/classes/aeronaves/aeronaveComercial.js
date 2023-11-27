import { Aeronave } from './aeronave.js'

export class AeronaveComercial extends Aeronave {
    #nomeCIA;
  
    constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCIA) {
      super(prefixo, velocidadeCruzeiro, autonomia);
      this.#nomeCIA = nomeCIA;
    }
    returnInfo() {  // retorno das informações da aeronave comercial
      return `${super.returnInfo()}, nome da companhia aérea: ${this.#nomeCIA}`;
    }
  }