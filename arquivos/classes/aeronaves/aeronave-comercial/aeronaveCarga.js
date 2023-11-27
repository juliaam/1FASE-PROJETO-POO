import { AeronaveComercial } from '../aeronaveComercial.js'

export class AeronaveCarga extends AeronaveComercial {
    #pesoMax;
  
    constructor( prefixo, velocidadeCruzeiro, autonomia, nomeCIA, pesoMax) {
      super(nomeCIA, prefixo, velocidadeCruzeiro, autonomia);
      this.#pesoMax = pesoMax;
    }
    returnInfo() { // retorno das informações da aeronave comercial
      return `${super.returnInfo()}, peso máximo: ${this.#pesoMax} `;
    }
  }