import type { Categoria, Despesa } from "./tipos.js";

function validarDespesa(despesa: Despesa): void {
  if (despesa.valor <= 0) {
    throw new Error("O valor da despesa deve ser maior que zero.");
  }

  if (despesa.mes < 1 || despesa.mes > 12) {
    throw new Error("O mês da despesa deve estar entre 1 e 12.");
  }
}

export function adicionarDespesa(despesas: readonly Despesa[], nova: Despesa): Despesa[] {
  validarDespesa(nova);
  return [...despesas, nova];
}

export function removerDespesa(despesas: readonly Despesa[], id: string): Despesa[] {
  return despesas.filter((despesa) => despesa.id !== id);
}

export function despesasDaCategoria(despesas: readonly Despesa[], categoria: Categoria): Despesa[] {
  return despesas.filter((despesa) => despesa.categoria === categoria);
}

export function totalGasto(despesas: readonly Despesa[]): number {
  return despesas.reduce((soma, despesa) => soma + despesa.valor, 0);
}

export function maiorDespesa(despesas: readonly Despesa[]): Despesa | undefined {
  if (despesas.length === 0) {
    return undefined;
  }

  return despesas.reduce((maior, atual) => (atual.valor > maior.valor ? atual : maior));
}
