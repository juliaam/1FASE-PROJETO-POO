export class ServicoAeronaves {
    #aeronaves = [];
  
    get aeronaves() {
      return this.#aeronaves.values();
    }
    recuperaAeronave(prefixoAeronave) {
        const aeronave = this.#aeronaves.find(
          (aeronave) => aeronave.prefixo === prefixoAeronave
        );
        if (aeronave) {
          return aeronave
        }
        return 

    }
    adicionarAeronave(aeronave) { // push nas aeronaves totais para que ela seja adicionada na totalidade de aeronaves
      return this.#aeronaves.push(aeronave);
    }
    todas() {  // retorno de todas as aeronaves adicionadas a este serviço
      // função que retorna todas as aeronaves
      let string = "";
      for (const aeronave of this.aeronaves) {
        string += `${aeronave.returnInfo()} \n`;
      }
      return string;
    }
  }