import { adicionarDespesa, despesasDaCategoria, maiorDespesa, removerDespesa, totalGasto } from "./despesas.js";
import { formatarRelatorio, matrizCategoriaMes } from "./relatorio.js";
import type { Despesa } from "./tipos.js";

const despesas: Despesa[] = [
  { id: "d1", descricao: "Almoço do mês", valor: 58.9, categoria: "alimentacao", mes: 1 },
  { id: "d2", descricao: "Uber para trabalho", valor: 32.5, categoria: "transporte", mes: 2 },
  { id: "d3", descricao: "Cinema com amigos", valor: 74.0, categoria: "lazer", mes: 3 },
  { id: "d4", descricao: "Aluguel", valor: 1450, categoria: "moradia", mes: 1 },
  { id: "d5", descricao: "Mercado", valor: 180.3, categoria: "alimentacao", mes: 3 },
  { id: "d6", descricao: "Passagem de ônibus", valor: 27.0, categoria: "transporte", mes: 4 },
  { id: "d7", descricao: "Show", valor: 120.0, categoria: "lazer", mes: 5 },
  { id: "d8", descricao: "Condomínio", valor: 620.0, categoria: "moradia", mes: 2 },
];

console.log("Despesas iniciais:");
console.log(despesas);

const despesasComNova = adicionarDespesa(despesas, {
  id: "d9",
  descricao: "Compra de mantimentos",
  valor: 95.5,
  categoria: "alimentacao",
  mes: 6,
});

const despesasSemTransporte = removerDespesa(despesasComNova, "d2");
const despesasAlimentacao = despesasDaCategoria(despesasComNova, "alimentacao");
const total = totalGasto(despesasComNova);
const despesaMaior = maiorDespesa(despesasComNova);
const matriz = matrizCategoriaMes(despesasComNova);

console.log("\nDespesas da categoria alimentação:");
console.log(despesasAlimentacao);

console.log("\nTotal gasto geral:");
console.log(total.toFixed(2));

console.log("\nMaior despesa:");
console.log(despesaMaior);

console.log("\nLista sem transporte:");
console.log(despesasSemTransporte);

console.log("\nMatriz por categoria e mês:");
console.log(matriz);

console.log("\nRelatório:\n");
console.log(formatarRelatorio(despesasComNova));
