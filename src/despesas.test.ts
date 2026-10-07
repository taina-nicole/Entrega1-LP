import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { adicionarDespesa, despesasDaCategoria, maiorDespesa, removerDespesa, totalGasto } from "./despesas.js";
import type { Categoria, Despesa } from "./tipos.js";

const despesasBase: Despesa[] = [
  { id: "d1", descricao: "Almoço", valor: 40, categoria: "alimentacao", mes: 9 },
  { id: "d2", descricao: "Uber", valor: 25, categoria: "transporte", mes: 9 },
  { id: "d3", descricao: "Cinema", valor: 60, categoria: "lazer", mes: 10 },
];

const categoria: Categoria = "alimentacao";

describe("adicionarDespesa", () => {
  it("adiciona uma despesa sem alterar o array original", () => {
    const original = [...despesasBase];
    const nova: Despesa = { id: "d4", descricao: "Conta de água", valor: 90, categoria: "moradia", mes: 11 };

    const resultado = adicionarDespesa(original, nova);

    assert.deepStrictEqual(resultado, [...original, nova]);
    assert.deepStrictEqual(original, despesasBase);
  });

  it("lança erro quando o valor é menor ou igual a zero", () => {
    assert.throws(
      () => adicionarDespesa(despesasBase, { id: "d5", descricao: "Inválida", valor: 0, categoria: "alimentacao", mes: 9 }),
      /valor/
    );
  });

  it("lança erro quando o mês está fora do intervalo válido", () => {
    assert.throws(
      () => adicionarDespesa(despesasBase, { id: "d6", descricao: "Inválida", valor: 10, categoria: "alimentacao", mes: 13 as never }),
      /mês/
    );
  });
});

describe("removerDespesa", () => {
  it("remove a despesa pelo id informado", () => {
    assert.deepStrictEqual(removerDespesa(despesasBase, "d2"), [despesasBase[0], despesasBase[2]]);
  });

  it("retorna uma cópia do array quando o id não existe", () => {
    const resultado = removerDespesa(despesasBase, "id-inexistente");

    assert.deepStrictEqual(resultado, despesasBase);
    assert.notStrictEqual(resultado, despesasBase);
  });
});

describe("despesasDaCategoria", () => {
  it("retorna apenas as despesas da categoria desejada", () => {
    assert.deepStrictEqual(despesasDaCategoria(despesasBase, categoria), [despesasBase[0]]);
  });
});

describe("totalGasto", () => {
  it("soma corretamente os valores das despesas", () => {
    assert.equal(totalGasto(despesasBase), 125);
  });

  it("retorna zero para lista vazia", () => {
    assert.equal(totalGasto([]), 0);
  });
});

describe("maiorDespesa", () => {
  it("retorna a despesa de maior valor", () => {
    assert.deepStrictEqual(maiorDespesa(despesasBase), despesasBase[2]);
  });

  it("retorna undefined para lista vazia", () => {
    assert.equal(maiorDespesa([]), undefined);
  });
});
