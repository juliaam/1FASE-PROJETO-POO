export class Piloto {
    #matricula;
    #nome;
    #habilitacaoAtiva;
  
    constructor(matricula, nome, habilitacaoAtiva) {
      this.#matricula = matricula;
      this.#nome = nome;
      this.#habilitacaoAtiva = habilitacaoAtiva;
    }
  
    get matricula() {
      return this.#matricula;
    }
    get nome() {
      return this.#nome;
    }
    get habilitacaoAtiva() {
      if (this.#habilitacaoAtiva) {
        return true;
      }
      return false;
    }
    returnInfo() { // função para mandar em escrito as informações
      return `Piloto de matrícula: ${this.matricula}, nome: ${this.nome}, estado da habilitação: ${this.habilitacaoAtiva}`;
    }
  }
    