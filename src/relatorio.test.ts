import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { descricaoCategoria, formatarRelatorio, matrizCategoriaMes } from "./relatorio.js";
import type { Despesa } from "./tipos.js";

const despesas: Despesa[] = [
  { id: "d1", descricao: "Almoço", valor: 40, categoria: "alimentacao", mes: 1 },
  { id: "d2", descricao: "Onibus", valor: 20, categoria: "transporte", mes: 2 },
  { id: "d3", descricao: "Cinema", valor: 60, categoria: "lazer", mes: 2 },
  { id: "d4", descricao: "Aluguel", valor: 1200, categoria: "moradia", mes: 1 },
  { id: "d5", descricao: "Jantar", valor: 35, categoria: "alimentacao", mes: 2 },
];

describe("descricaoCategoria", () => {
  it("retorna o nome de exibição da categoria", () => {
    assert.equal(descricaoCategoria("alimentacao"), "Alimentação");
    assert.equal(descricaoCategoria("transporte"), "Transporte");
    assert.equal(descricaoCategoria("lazer"), "Lazer");
    assert.equal(descricaoCategoria("moradia"), "Moradia");
  });
});

describe("matrizCategoriaMes", () => {
  it("monta a matriz com linha por categoria e colunas por mês", () => {
    const matriz = matrizCategoriaMes(despesas);

    assert.deepStrictEqual(matriz[0], [40, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    assert.deepStrictEqual(matriz[1], [0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    assert.deepStrictEqual(matriz[2], [0, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    assert.deepStrictEqual(matriz[3], [1200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
});

describe("formatarRelatorio", () => {
  it("retorna o relatório formatado com título, totais e maior despesa", () => {
    const relatorio = formatarRelatorio(despesas);

    assert.match(relatorio, /RELATÓRIO DE DESPESAS/);
    assert.match(relatorio, /Alimentação/);
    assert.match(relatorio, /TOTAL GERAL:/);
    assert.match(relatorio, /MAIOR DESPESA:/);
    assert.match(relatorio, /Aluguel - 1200\.00/);
  });
});
