export class ServicoAerovias {
    #aerovias = [];
  
    adicionarAerovia(aerovia) { // push para adicionar aerovia em sua totalidade
      return this.#aerovias.push(aerovia);
    }
    recuperaAerovia(idAerovia) {
      const aerovia = this.#aerovias.find(
        (aerovia) => aerovia.id === idAerovia
      );
      if (aerovia) {
        return aerovia
      }
      return 
    }
    recupera(origem, destino) { // recuperar uma aerovia de acordo com sua origem e destino
      if(!origem || !destino) {
        return 'Forneça a origem e o destino!'
      }
      const aerovia = this.#aerovias.find(
        (aerovia) => aerovia.origem.toLowerCase() === origem.toLowerCase() && aerovia.destino.toLowerCase() === destino.toLowerCase()
      );
      if(aerovia) {
        return aerovia.returnInfo();
      }
      return 'Não foi possível encontrar!'
    }
  }