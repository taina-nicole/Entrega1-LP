# Entrega 1 - Sistema de despesas

Este projeto implementa modelagem, operações e relatório para despesas mensais, usando TypeScript com foco em tipagem estrita e imutabilidade.

## Como instalar

1. Clone o repositório.
2. Entre na pasta do projeto.
3. Execute:

```bash
npm install
```

## Como testar

```bash
npm test
```

## Como rodar o projeto

```bash
npm run dev
```

Isso executa o arquivo principal em [src/index.ts](src/index.ts) e imprime o relatório de despesas de exemplo.

## Arquivos de configuração

- `package.json`: define os scripts `dev` e `test`, além das dependências do projeto.
- `tsconfig.json`: habilita `strict: true`, usa `module` em NodeNext e mantém a verificação estrita do TypeScript.
- `.gitignore`: ignora `node_modules`, build e arquivos de ambiente tais como `.env`.
- Não há arquivo de configuração do Vitest no repositório; a execução de testes usa o runner de TypeScript do `tsx` para manter a compatibilidade com o projeto.

## Registro de uso de IA

| Função | Como a IA ajudou | Ajuste humano e teste adicionado |
| --- | --- | --- |
| `adicionarDespesa` | Criei a estrutura básica de validação do valor e do mês. | A IA inicialmente sugeriu mutar o array; corrigi para retornar uma cópia e adicionei teste de não mutação do array original. |
| `removerDespesa` | Gerou a lógica de filtragem por `id`. | Ajustei o comportamento para manter a cópia do array quando o ID não existir, com teste de não referência. |
| `despesasDaCategoria` | Definiu o filtro por categoria. | Validado com testes de categoria e cenário de lista vazia resultante em caso de ausência de matches. |
| `totalGasto` | Implementou a soma acumulada. | Acrescentei teste de lista vazia para garantir retorno `0`. |
| `maiorDespesa` | Estruturou a comparação por maior valor. | A IA sugeriu uma abordagem insegura para lista vazia; corrigi com `undefined` e teste de borda. |
| `descricaoCategoria` | Definiu a conversão em texto por categoria. | Acrescentei teste de categoria inválida para cobrir o `default` do `switch`. |
| `matrizCategoriaMes` | Montou a estrutura de linha e coluna por mês. | Ajustei a lógica para usar somente laços e cobrir o caso de matriz vazia. |
| `formatarRelatorio` | Estruturou o texto do relatório. | Corrigi o alinhamento e o texto final com testes de caso normal e vazio. |

## Reflexão

A IA acertou a base da modelagem, mas precisou de ajuste na parte de imutabilidade da função `adicionarDespesa`, porque a primeira versão sugerida alterava o array original. Também houve necessidade de corrigir a implementação do relatório para evitar uso de `filter` e respeitar a exigência de laços somente. O teste de não mutação do array foi acrescentado porque a lógica parecia correta, mas a regra do projeto era mais rígida do que a solução inicial. Em seguida, a IA gerou corretamente a estrutura da matriz por categoria, mas foi necessário validar o caso de lista vazia para evitar erros de índice. O `switch` de `descricaoCategoria` foi aceito, porém cobri o caso inválido com teste para garantir a segurança do `default`. A parte final do relatório exigiu alinhamento e texto em maiúsculas, então incluí testes para confirmar o comportamento em casos normais e vazios. Esses testes tornaram a implementação mais confiável e ajudaram a evitar regressões.

## Requisitos técnicos atendidos

- `strict: true` no `tsconfig.json`.
- `npx tsc --noEmit` passa sem erros.
- Nenhum `any` foi usado no projeto.
- `const` foi usado como padrão; `let` somente em casos de reatribuição em laços.
- Comparações feitas com `===` e `!==`.
- Há pelo menos um campo `readonly`, um campo opcional com comentário e um `union type`.
- O código está dividido em módulos (`tipos`, `despesas`, `relatorio` e `index.ts`) com `export/import`.
- Existe teste provando que `adicionarDespesa` não altera a lista original e o comentário de imutabilidade foi incluído na função.
- `npm test` passa sem `it.todo`.
- Todas as funções têm teste de caso normal e de borda.
