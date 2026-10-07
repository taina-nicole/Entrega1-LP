/**
 * Categoria válida para qualquer despesa do sistema.
 * Como a descrição delimita exatamente quatro opções, usamos union type
 * em vez de string simples para restringir valores incorretos em tempo de compilação.
 */
export type Categoria = "alimentacao" | "transporte" | "lazer" | "moradia";

/**
 * Mês do ano em que a despesa ocorreu.
 * Definimos a faixa como union literal de 1 a 12 para evitar meses inválidos.
 */
export type Mes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Representa uma despesa do sistema.
 * - `id` é readonly porque o identificador nunca muda depois de criado.
 * - `descricao`, `valor`, `categoria` e `mes` são obrigatórios, pois a descrição exige que existam sempre.
 * - `observacao` é opcional, porque o texto diz que ela pode aparecer ou não.
 */
export interface Despesa {
  readonly id: string;
  descricao: string;
  valor: number;
  categoria: Categoria;
  mes: Mes;
  observacao?: string;
}

/**
 * Ordem usada na matriz do relatório.
 * Mantemos a sequência fixa para que os índices da matriz correspondam às categorias esperadas.
 */
export const CATEGORIAS: readonly Categoria[] = [
  "alimentacao",
  "transporte",
  "lazer",
  "moradia",
];
