import { maiorDespesa, totalGasto } from "./despesas.js";
import { CATEGORIAS, type Categoria, type Despesa } from "./tipos.js";

export function descricaoCategoria(categoria: Categoria): string {
  switch (categoria) {
    case "alimentacao":
      return "Alimentação";
    case "transporte":
      return "Transporte";
    case "lazer":
      return "Lazer";
    case "moradia":
      return "Moradia";
    default:
      return "Categoria inválida";
  }
}

export function matrizCategoriaMes(despesas: readonly Despesa[]): number[][] {
  const matriz: number[][] = [];

  for (let indiceCategoria = 0; indiceCategoria < CATEGORIAS.length; indiceCategoria++) {
    const categoriaAtual = CATEGORIAS[indiceCategoria];

    if (categoriaAtual === undefined) {
      continue;
    }

    const linha: number[] = [];

    for (let mes = 1; mes <= 12; mes++) {
      let totalMes = 0;

      for (let indiceDespesa = 0; indiceDespesa < despesas.length; indiceDespesa++) {
        const despesa = despesas[indiceDespesa];

        if (despesa !== undefined && despesa.categoria === categoriaAtual && despesa.mes === mes) {
          totalMes += despesa.valor;
        }
      }

      linha.push(Number(totalMes.toFixed(2)));
    }

    matriz.push(linha);
  }

  return matriz;
}

export function formatarRelatorio(despesas: readonly Despesa[]): string {
  const linhas: string[] = [];
  const titulo = "relatório de despesas".toUpperCase();
  linhas.push(titulo);
  linhas.push("-".repeat(titulo.length));

  for (let indiceCategoria = 0; indiceCategoria < CATEGORIAS.length; indiceCategoria++) {
    const categoriaAtual = CATEGORIAS[indiceCategoria];

    if (categoriaAtual === undefined) {
      continue;
    }

    let totalCategoria = 0;

    for (let indiceDespesa = 0; indiceDespesa < despesas.length; indiceDespesa++) {
      const despesa = despesas[indiceDespesa];

      if (despesa !== undefined && despesa.categoria === categoriaAtual) {
        totalCategoria += despesa.valor;
      }
    }

    const nomeCategoria = descricaoCategoria(categoriaAtual).padEnd(12, " ");
    const valorCategoria = totalCategoria.toFixed(2).padStart(10, " ");
    linhas.push(`${nomeCategoria} ${valorCategoria}`);
  }

  let totalGeral = 0;
  for (let indiceDespesa = 0; indiceDespesa < despesas.length; indiceDespesa++) {
    const despesa = despesas[indiceDespesa];

    if (despesa !== undefined) {
      totalGeral += despesa.valor;
    }
  }

  const totalGeralFormatado = totalGeral.toFixed(2).padStart(10, " ");
  const maior = maiorDespesa(despesas);
  const maiorDescricao = maior ? `${maior.descricao} - ${maior.valor.toFixed(2)}` : "Nenhuma despesa";

  linhas.push("");
  linhas.push(`TOTAL GERAL: ${totalGeralFormatado}`);
  linhas.push(`MAIOR DESPESA: ${maiorDescricao}`);

  return linhas.join("\n");
}
