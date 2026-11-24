# Divisão do grupo: Loja Fake (Ionic + Angular standalone)

Na apresentação cada pessoa responde 3 coisas sobre a sua parte:
**1) O que faz? 2) Onde está no código? 3) Onde aparece na tela?**

Cada arquivo tem um comentário no topo com `RESPONSÁVEL: Pessoa X` e a explicação do requisito.
Se o grupo tiver 5 pessoas, a Pessoa 1 assume também a parte da Pessoa 6.

---

## Pessoa 1: Home, rotas e configuração (1 ponto: 3 pages além do Home)
- **O que faz:** define as 4 páginas (Home, Lista, Detalhes, Favoritos) e liga o HttpClient e o Ionic no app.
- **Código:** `src/app/app.routes.ts`, `src/app/app.config.ts`, `src/app/pages/home/`
- **Na tela:** a Home, e os botões "Ver produtos" e "Ver favoritos" levando às outras páginas.
- **Explicar:** `loadComponent` carrega cada página só quando ela é aberta; `provideHttpClient()` é o que permite o service usar HTTP.
- **Idioma:** em `app.config.ts`, `registerLocaleData` + `LOCALE_ID: 'pt-BR'` fazem as pipes `currency` e `number` usarem o padrão brasileiro (vírgula decimal).
- **Visual:** `src/styles.scss` define as cores, a etiqueta de preço e a cor de cada categoria; a fonte (Bricolage Grotesque) é carregada no `index.html`. `provideIonicAngular({ mode: 'md' })` mantém o mesmo visual em qualquer aparelho. Cada página tem o seu `.scss`.

## Pessoa 2: Service da API (0,5 ponto da API + 1 ponto do service)
- **O que faz:** `ProdutosService` conversa com a Fake Store API usando HttpClient. Tem 4 GETs: `listarTodos`, `buscarPorId`, `listarCategorias`, `listarPorCategoria`.
- **Código:** `src/app/services/produtos.service.ts`, `src/app/data/traducoes.ts` e o uso do service em `src/app/pages/lista/lista.page.ts` (métodos `ngOnInit` e `carregarProdutos`).
- **Na tela:** página Lista (produtos e abas de categoria) e Detalhes (um produto).
- **Explicar:** `Observable` + `.subscribe()`, e por que o resultado vai para um `signal`.
- **Tradução:** a API responde em inglês. O service usa `.pipe(map(...))` para trocar título, descrição e categoria pelas versões em português guardadas em `src/app/data/traducoes.ts`. Em `listarPorCategoria`, o nome em português é convertido de volta para o original, que é o que a API entende.
- **Catálogo:** `src/app/data/produtos-extras.ts` lista os 4 produtos da API que a loja não mostra (ids 4, 7, 12 e 19) e 6 produtos próprios (ids 101 a 106, com ilustrações em `public/produtos/` e a categoria nova "casa"). O service junta tudo; os 4 GETs continuam os mesmos.

## Pessoa 3: Detalhes + parâmetro de rota (1 ponto extra + bloco @if)
- **O que faz:** ao clicar num card da Lista, a rota `/detalhes/:id` leva o id do produto até a página Detalhes, que busca e mostra aquele produto.
- **Código:**
  - Envio do id: `lista.page.html` -> `[routerLink]="['/detalhes', p.id]"`
  - Rota: `app.routes.ts` -> `detalhes/:id`
  - Leitura do id: `detalhes.page.ts` -> `route.snapshot.paramMap.get('id')`
  - Bloco `@if`: `detalhes.page.html` (carregando / erro / produto / texto do botão) e `lista.page.html` (carregando / erro / lista)
- **Na tela:** clique em qualquer produto; a URL muda para `/detalhes/5` e a página mostra o produto 5.

## Pessoa 4: Pipes (1 ponto: 2 personalizadas + 2 built-in)
- **Personalizadas:** `src/app/pipes/preco.pipe.ts` (dólar -> "R$ 1.234,56") e `src/app/pipes/resumo.pipe.ts` (corta texto e põe "...").
- **Built-in:** `titlecase` e `uppercase` (e também `currency`, `number`). Elas já vêm no Angular, então `src/app/pipes/builtin.pipes.ts` só reúne todas num lugar, ao lado das personalizadas, e as páginas importam delas a partir daí.
- **Onde são usadas:**
  - `preco`: `lista.page.html`, `favoritos.page.html` e `detalhes.page.html`
  - `resumo`: `lista.page.html` e `favoritos.page.html` (título do card)
  - `titlecase`: `lista.page.html` e `favoritos.page.html` (categoria)
  - `uppercase`: `home.page.html` e `detalhes.page.html`
  - `currency` e `number`: `detalhes.page.html` (o `number` também aparece na nota do card em `lista.page.html`)
- **Na tela:** preços em reais nos cards, título cortado, categoria com iniciais maiúsculas, nome da loja em maiúsculas.
- **Explicar:** a pipe só transforma o que aparece, o dado original não muda; e precisa estar no `imports` do componente.

## Pessoa 5: Diretivas personalizadas + bloco @for (0,5 + 0,5 ponto)
- **Personalizadas:** `src/app/directives/destaque.directive.ts` (usa `@HostListener`: o card cresce no hover) e `src/app/directives/avaliacao-cor.directive.ts` (usa `@HostBinding`: nota verde, laranja ou vermelha).
- **Bloco `@for`:** `lista.page.html` (cards de produtos e abas de categoria) e `favoritos.page.html` (cards dos favoritos), sempre com `track`.
- **Na tela:** passe o mouse num card da Lista (cresce e ganha sombra); a nota com estrela muda de cor conforme o valor.
- **Explicar:** diretiva de atributo muda o comportamento ou o visual do elemento onde foi colocada.

## Pessoa 6: Service de favoritos + página Favoritos (1 ponto do service)
- **O que faz:** `FavoritosService` guarda os produtos favoritos e salva no `localStorage` (não usa API: é a "outra funcionalidade" do requisito dos 2 services).
- **Código:** `src/app/services/favoritos.service.ts`, `src/app/pages/favoritos/`. Usado em `lista.page.html` (coração e atalho na barra), `detalhes.page.html` (botão), `home.page.html` (contador e botão "Ver favoritos") e na própria página Favoritos.
- **Na tela:** clique no coração de um produto, atualize a página (F5) e ele continua favorito; a Home mostra "Você tem X favorito(s)". A página Favoritos (botão na Home ou coração na barra da Lista) mostra só os produtos favoritados; ao tirar o coração o card some na hora, e sem favoritos aparece uma mensagem com um botão para a Lista.
- **Explicar:** `salvos` é um `computed` que filtra a lista de produtos pelos ids do `FavoritosService`, por isso a tela atualiza sozinha. `manterApenas` descarta favoritos de produtos que não existem mais na loja.
---

## Checklist dos requisitos
| Requisito | Pontos | Onde |
|---|---|---|
| 3 pages além do Home | 1 | Lista, Detalhes, Favoritos |
| API com 3+ GET | 0,5 | `produtos.service.ts` |
| 2 pipes custom + 2 built-in | 1 | `pipes/` + `titlecase`, `uppercase` |
| 2 services (HttpClient + outra funcionalidade) | 2 | `produtos.service.ts`, `favoritos.service.ts` |
| 2 diretivas custom | 0,5 | `directives/` |
| `@if` | 0,5 | Lista, Detalhes, Home, Favoritos |
| `@for` | 0,5 | Lista, Favoritos |
| Parâmetro por rota (extra) | 1 | `detalhes/:id` |

## Como rodar
```
npm install
npx ng serve
```
Abra http://localhost:4200. Para testar no formato celular, use o modo responsivo do navegador (F12).

Observação: o projeto usa Ionic 9, em que os componentes são importados de `@ionic/angular` (nas versões 7 e 8 era `@ionic/angular/standalone`).
