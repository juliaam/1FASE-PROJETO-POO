import nReadlines from "n-readlines";
import prompt from "prompt-sync";

import { Piloto } from "./arquivos/classes/pilotos/index.js";
import {
  AeronaveParticular,
  AeronaveComercial,
  AeronaveCarga,
  AeronavePassageiros,
  Aeronave,
} from "./arquivos/classes/aeronaves/index.js";
import { Aerovia } from "./arquivos/classes/aerovias/index.js";
import { PlanoDeVoo } from "./arquivos/classes/plano-de-voo/index.js";
import {
  ServicoAeronaves,
  ServicoAerovias,
  ServicoPilotos,
  ServicoPlanos,
} from "./arquivos/classes/servicos/index.js";
import { Menu } from "./arquivos/classes/menu/menu.js";
import { OcupacaoAerovia } from "./arquivos/classes/ocupacao-aerovia/OcupacaoAerovia.js";

const input = prompt();

// exemplo de usoa
const pilotos = new nReadlines("arquivos/pilotos.txt");
const aerovias = new nReadlines("arquivos/aerovias.txt");
const aeronaves = new nReadlines("arquivos/aeronaves.txt");

let buf;
let linha;

// criação dos objetos

export const servicoPiloto = new ServicoPilotos();
export const servicoAeronave = new ServicoAeronaves();
export const servicoAerovia = new ServicoAerovias();
export const servicoPlano = new ServicoPlanos();

const menu = new Menu();
export const ocupacao = new OcupacaoAerovia();

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

const planoteste1 = new PlanoDeVoo('p02br', 'br01sprj', new Date(), new Date().getHours() + ':' + new Date().getMinutes(), 26000, [13, 14], false, 'BR022023')
servicoPlano.adicionarPlano(planoteste1)

let fim = false;
while (!fim) {
  console.log(
    "1- Listar Aerovias \n 2- Listar altitudes livres \n 3- Aprovar plano de voo \n 4- Listar Planos \n 5- Listar ocupação \n 6- Cancelar plano \n 0- sair"
  );
  const inputReceived = input("Insira a opção selecionada: ");
  switch (inputReceived) {
    case "1":
      const inputList = input("Insira a origem do aeroporto: ");
      const inputList2 = input("Insira o destino: ");
      console.log(menu.listarAerovias(inputList, inputList2));
      break;
    case "2":
      console.log(menu.listarAltitudesLivres());
      break;

      case "3":
        console.log(
          "Digite 1 para escolher um plano de todos os planos criados\nDigite 2 para criar um novo plano\nDigite 0 para sair"
        );
        const input3 = input("Insira a opção selecionada: ");
        switch (input3) {
          case "1":
            console.log(servicoPlano.todos());
            const inputPlano = input("Digite o id do plano:");
            const plano = servicoPlano.recuperaPlano(inputPlano)
            const planoConsistente = servicoPlano.consiste(plano);
            if (planoConsistente != true) {
              console.log("Plano não consistente.");
              break;
            }
            console.log(menu.aprovarPlanoDeVoo(planoConsistente));
            break;
      
          case "2":
            console.log(servicoPiloto.todos())
            const matriculaPiloto = input("Matrícula do piloto:");
            console.log(servicoAerovia.todas())
            const idAerovia = input("ID da aerovia:");
            console.log(servicoAeronave.todas())
            const prefixoAeronave = input("Prefixo da aeronave:");
            const data = input("Data (digite como 12/11/2023, por exemplo):");
            const horario = input("Horário (digite como 13:14, por exemplo): ");
            const altitude = input("Altitude: ");
            const slots = input("Quantidade de slots ocupados:");
            const novoPlano = new PlanoDeVoo(
              matriculaPiloto,
              idAerovia,
              data,  
              horario,
              altitude,
              slots,
              prefixoAeronave,
            );
      
            const consiste = servicoPlano.consiste(novoPlano);
            if (consiste !== true) {
              console.log(consiste);
              break;
            }
      
            servicoPlano.adicionarPlano(novoPlano);
            console.log(menu.aprovarPlanoDeVoo(novoPlano));
            break;
      
          case "0":
            fim = true;
            break;
        }
        break;

    case "4":
      console.log(menu.listarPlanos())
      const id = input("Insira o ID do plano: ")
      console.log(menu.listarPlano(id));
      break;
    case "5":
      console.log(menu.listarOcupacoes());
      break;
    case "6":
      console.log(ocupacao.listarOcupacoes())
      const planoCancelar = input("Insira o id do plano de voo:");
      console.log(menu.cancelarPlano(planoCancelar));
      break;
    case "0":
      fim = true;
  }
}
