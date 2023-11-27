export class ServicoPilotos  {
    #pilotos = [];
  
    get pilotos() {
      return this.#pilotos.values();
    }
  
    adicionarPiloto(piloto) { // push que adiciona piloto a totalidade de piltos deste serviço
      return this.#pilotos.push(piloto);
    }
    recuperaHabilitacaoAtiva(matricula) {
      const piloto = this.#pilotos.find(
        (piloto) => piloto.matricula === matricula
      );
      if (piloto) {
        return piloto.habilitacaoAtiva
      }
      return "Piloto não encontrado, digite a matrícula corretamente!";
    }
    recupera(matricula) { 
      // função que acha o piloto pelo find, e, caso tenha piloto, ele irá retorná-lo
      const piloto = this.#pilotos.find(
        (piloto) => piloto.matricula === matricula
      );
      if (piloto) {
        return `Piloto de matrícula: ${piloto.matricula}, nome: ${piloto.nome} e estado da habilitação: ${piloto.habilitacaoAtiva}`;
      }
      return "Piloto não encontrado, digite a matrícula corretamente!";
    }
    todos() {
      // função que retorna todos os pilotos
      let string = "";
      for (const piloto of this.pilotos) {
        string += `${piloto.returnInfo()} \n`;
      }
      return string;
    }
  }