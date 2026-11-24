# LojaFake

Este projeto foi gerado com o [Angular CLI](https://github.com/angular/angular-cli) versão 22.3.0.

Os produtos vêm da [Fake Store API](https://fakestoreapi.com), que responde em inglês. O app traduz títulos, descrições e categorias para português do Brasil (veja `src/app/data/traducoes.ts`). A divisão de tarefas do grupo está em [DIVISAO.md](DIVISAO.md).

## Servidor de desenvolvimento

Para iniciar um servidor de desenvolvimento local, execute:

```bash
ng serve
```

Com o servidor rodando, abra o navegador e acesse `http://localhost:4200/`. A aplicação recarrega automaticamente sempre que você modificar qualquer arquivo de código.

## Geração de código (scaffolding)

O Angular CLI inclui ferramentas de geração de código. Para gerar um novo componente, execute:

```bash
ng generate component nome-do-componente
```

Para ver a lista completa de schematics disponíveis (como `components`, `directives` ou `pipes`), execute:

```bash
ng generate --help
```

## Build

Para compilar o projeto, execute:

```bash
ng build
```

Isso compila o projeto e guarda os arquivos gerados no diretório `dist/`. Por padrão, o build de produção otimiza a aplicação para ter melhor desempenho e velocidade.

## Testes unitários

Para executar os testes unitários com o [Vitest](https://vitest.dev/), use o comando:

```bash
ng test
```

## Testes end-to-end

Para testes end-to-end (e2e), execute:

```bash
ng e2e
```

O Angular CLI não vem com um framework de testes end-to-end por padrão. Você pode escolher o que melhor atende às suas necessidades.

## Recursos adicionais

Para mais informações sobre o uso do Angular CLI, incluindo referências detalhadas dos comandos, acesse a página [Visão geral e referência de comandos do Angular CLI](https://angular.dev/tools/cli).
