export class Aerovia {
    #id;
    #origem;
    #destino;
    #tamanho;
  
    constructor(id, origem, destino, tamanho) {
      this.#id = id;
      this.#origem = origem;
      this.#destino = destino;
      this.#tamanho = tamanho;
    }
  
    get id() {
      return this.#id;
    }
    get origem() {
      return this.#origem;
    }
  
    get destino() {
      return this.#destino;
    }
  
    get tamanho() {
      return this.#tamanho;
    }
    
    returnInfo() { // retornar as informações da aerovia
      return `Aerovia - id: ${this.id}, origem: ${this.origem},
       destino: ${this.destino}, tamanho: ${this.tamanho}km`;
    }
  }
  
 