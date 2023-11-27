import nReadlines from "n-readlines";
import prompt from "prompt-sync";
import { Aeronave, AeronaveCarga, AeronaveComercial, AeronaveParticular, AeronavePassageiros, ServicoAeronaves } from './arquivos/classes/aeronaves/index.js'
import { Aerovia, ServicoAerovias } from "./arquivos/classes/aerovias/index.js"
import { Piloto, ServicoPilotos } from "./arquivos/classes/pilotos/index.js"


const input = prompt();

// exemplo de uso
const pilotos = new nReadlines("arquivos/pilotos.txt");
const aerovias = new nReadlines("arquivos/aerovias.txt");
const aeronaves = new nReadlines("arquivos/aeronaves.txt");

let buf;
let linha;

// exemplo de uso (menu)

// criados os serviços
const servicoPiloto = new ServicoPilotos();
const servicoAeronave = new ServicoAeronaves();
const servicoAerovia = new ServicoAerovias();

// leitura dos arquivos, e toda vez a função vai adicionar um pertencente a classe, e automaticamente adicionar ao serviço também
while ((buf = pilotos.next())) {
  // leitura do arquivo de pilotos
  linha = buf.toString("utf8");
  linha = linha.split(",");

  let habilitacaoAtiva = linha[2].trim() === "ativo" ? true : false; // tirar os espaços e transformar em booleano
  const piloto = new Piloto(linha[0], linha[1].trim(), habilitacaoAtiva); // criar um novo piloto e remover os espaços em branco
  servicoPiloto.adicionarPiloto(piloto); // adicionar piloto ao serviço
}

while ((buf = aeronaves.next())) {
  // leitura do arquivo de aerovias
  linha = buf.toString("utf8");
  linha = linha.split(",");
  const aeronave = new AeronaveParticular( // atribuição dos valores
    linha[0].trim(),
    Number(linha[1].trim()),
    Number(linha[2].replace("\r", "").trim()),
    linha[3].trim()
  ); // nesse caso foram adicionadas aeronaves particulares, mas podem ser adicionadas outras
  servicoAeronave.adicionarAeronave(aeronave); //
}

while ((buf = aerovias.next())) {
  // leitura do arquivo de aerovias
  linha = buf.toString("utf8");
  linha = linha.split(",");
  const aerovia = new Aerovia( // atribuição dos valores
    linha[0].trim(),
    linha[1].trim(),
    linha[2].trim(),
    Number(linha[3].replace("\r", ""))
  );
  servicoAerovia.adicionarAerovia(aerovia);
}

let fim = false;
while (!fim) {
  let string =
    "1- Listar pilotos \n 2-Adicionar piloto\n 3-Listar aeronaves \n";
  string +=
    " 4-Adicionar aeronave \n 5-Buscar aerovia \n 6- Adicionar aerovia \n 0- sair";
  console.log(string);
  const inputReceived = input("Insira a opção selecionada: ");
  if (inputReceived == 0) {
    fim = true;
  }
  switch (inputReceived) {
    case "0":
      fim = true;
      break;
    case "1":
      console.log(servicoPiloto.todos());
      break;
    case "2":
      console.log("Digite a matrícula, nome e o estado da habilitação");
      const matricula = input("Matrícula: ");
      const nome = input("Nome: ");
      const estadoHabilitacao = input(
        "Estado da habilitação (ativo/inativo): "
      );
      const habilitacaoAtiva = estadoHabilitacao.trim() === "ativo";
      const novoPiloto = new Piloto(matricula, nome, habilitacaoAtiva);
      servicoPiloto.adicionarPiloto(novoPiloto);
      break;
    case "3":
      console.log(servicoAeronave.todas());
      break;
    case "4":
      console.log("Escolha o tipo de aeronave:");
      console.log("1 - Aeronave Particular");
      console.log("2 - Aeronave de Passageiros");
      console.log("3 - Aeronave de Carga");
      const inputAeronave = input("Insira a opção selecionada: ");
      if (
        inputAeronave === "1" ||
        inputAeronave === "2" ||
        inputAeronave === "3"
      ) {
        let novaAeronave;
        if (inputAeronave === "1") {
          console.log(
            "Digite o prefixo, velocidade do cruzeiro(km), autonomia(km) e o responsável pela manutenção"
          );
          novaAeronave = new AeronaveParticular(
            input("Prefixo: "),
            Number(input("Velocidade do cruzeiro (km): ")),
            Number(input("Autonomia (km): ")),
            input("Responsável pela manutenção: ")
          );
        } else if (inputAeronave === "2") {
          console.log(
            "Digite o prefixo, velocidade do cruzeiro(km), autonomia(km), companhia aérea e o máximo de passageiros"
          );
          novaAeronave = new AeronavePassageiros(
            input("Prefixo: "),
            Number(input("Velocidade do cruzeiro (km): ")),
            Number(input("Autonomia (km): ")),
            input("Companhia aérea: "),
            Number(input("Máximo de passageiros: "))
          );
        } else if (inputAeronave === "3") {
          console.log(
            "Digite o prefixo, velocidade do cruzeiro(km), autonomia(km), companhia aérea e o peso máximo"
          );
          novaAeronave = new AeronaveCarga(
            input("Prefixo: "),
            Number(input("Velocidade do cruzeiro (km): ")),
            Number(input("Autonomia (km): ")),
            input("Companhia aérea: "),
            Number(input("Peso máximo (kg): "))
          );
        }
        servicoAeronave.adicionarAeronave(novaAeronave);
      } else {
        console.log("Opção inválida para tipo de aeronave.");
      }
      break;
    case "5":
      console.log("Digite a origem e o destino");
      const origem = input("Origem: ");
      const destino = input("Destino: ");
      console.log(servicoAerovia.recupera(origem, destino));
      break;
    case "6":
      console.log("Digite o id, origem, destino e o tamanho");
      const novaAerovia = new Aerovia(
        input("ID: "),
        input("Origem: "),
        input("Destino: "),
        Number(input("Tamanho (km): "))
      );
      servicoAerovia.adicionarAerovia(novaAerovia);
      break;

    case "6":
      console.log("Digite o id, origem, destino e o tamanho");
      console.log(servicoAerovia.adicionarAerovia(inputReceived));
      break;
  }
}
