export class Aeronave {
    #prefixo;
    #velocidadeCruzeiro;
    #autonomia;
  
    constructor(prefixo, velocidadeCruzeiro, autonomia) {
      if (velocidadeCruzeiro < 0) { // validação dos parâmetros
        throw new Error("Velocidade inválida, digite novamente");
      }
      if (autonomia < 0) {
        throw new Error("Autonomia inválida, digite novamente");
      }
      this.#prefixo = prefixo;
      this.#velocidadeCruzeiro = velocidadeCruzeiro;
      this.#autonomia = autonomia;
    }
    get prefixo() {
      return this.#prefixo;
    }
    get velocidadeCruzeiro() {
      return this.#velocidadeCruzeiro;
    }
    get autonomia() {
      return this.#autonomia;
    }
    returnInfo() { // retorno das informações de aeronave
      return `Aeronave - prefixo: ${this.prefixo}, velocidade de cruzeiro: ${this.velocidadeCruzeiro}km,
       autonomia: ${this.autonomia}km`;
    }
  }
  
  