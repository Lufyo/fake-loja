// RESPONSÁVEL: Pessoa 2 (Service da API)
//
// Requisitos que este arquivo cobre:
//  - API usada: Fake Store API (sem token e sem header)
//  - No mínimo 3 métodos GET: listarTodos, buscarPorId, listarCategorias (+ listarPorCategoria)
//  - Service 1 de 2: usa o HttpClient
//
// Onde aparece em tela: página Lista (produtos e categorias) e página Detalhes (um produto).
//
// Idioma: a API responde em inglês. Cada método traduz a resposta para português
// (veja data/traducoes.ts) antes de entregar para as páginas.
//
// Catálogo: a loja não mostra alguns produtos da API e acrescenta produtos próprios
// (veja data/produtos-extras.ts). Os extras aparecem primeiro na lista.
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of, throwError } from 'rxjs';
import { IDS_REMOVIDOS, PRODUTOS_EXTRAS } from '../data/produtos-extras';
import { CATEGORIAS_ORIGINAIS, CATEGORIAS_PT, PRODUTOS_PT } from '../data/traducoes';
import { Produto } from '../models/produto.model';

@Injectable({ providedIn: 'root' })
export class ProdutosService {
  private http = inject(HttpClient);
  private readonly API = 'https://fakestoreapi.com';

  // GET 1: todos os produtos (extras da loja + produtos da API)
  listarTodos(): Observable<Produto[]> {
    return this.http
      .get<Produto[]>(`${this.API}/products`)
      .pipe(map((lista) => [...PRODUTOS_EXTRAS, ...this.prepararDaApi(lista)]));
  }

  // GET 2: um produto pelo id (usado na página Detalhes)
  buscarPorId(id: number): Observable<Produto> {
    // produto extra: vive só na loja, não existe na API
    const extra = PRODUTOS_EXTRAS.find((p) => p.id === id);
    if (extra) return of(extra);

    // produto da API que a loja não mostra mais: a página Detalhes mostra "Produto não encontrado"
    if (IDS_REMOVIDOS.includes(id)) {
      return throwError(() => new Error('Produto removido da loja'));
    }

    return this.http.get<Produto>(`${this.API}/products/${id}`).pipe(map((p) => this.traduzir(p)));
  }

  // GET 3: lista de categorias (já em português, ex.: "roupas masculinas")
  listarCategorias(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API}/products/categories`).pipe(
      map((cats) => {
        const daApi = cats.map((c) => CATEGORIAS_PT[c] ?? c);
        // categorias que só existem nos produtos extras (ex.: "casa")
        const novas = PRODUTOS_EXTRAS.map((p) => p.category).filter((c) => !daApi.includes(c));
        return [...daApi, ...new Set(novas)];
      }),
    );
  }

  // GET 4: produtos de uma categoria (recebe o nome em português, a API precisa do original)
  listarPorCategoria(categoria: string): Observable<Produto[]> {
    const extras = PRODUTOS_EXTRAS.filter((p) => p.category === categoria);
    const nomeNaApi = CATEGORIAS_ORIGINAIS[categoria];

    // categoria que só existe nos extras: não há o que buscar na API
    if (!nomeNaApi && extras.length > 0) return of(extras);

    return this.http
      .get<Produto[]>(`${this.API}/products/category/${encodeURIComponent(nomeNaApi ?? categoria)}`)
      .pipe(map((lista) => [...extras, ...this.prepararDaApi(lista)]));
  }

  // Tira os produtos que a loja não mostra e traduz o restante.
  private prepararDaApi(lista: Produto[]): Produto[] {
    return lista.filter((p) => !IDS_REMOVIDOS.includes(p.id)).map((p) => this.traduzir(p));
  }

  // Troca título, descrição e categoria pelas versões em português.
  // Se não houver tradução para o produto, mantém o texto original.
  private traduzir(p: Produto): Produto {
    const traducao = PRODUTOS_PT[p.id];
    return {
      ...p,
      title: traducao?.title ?? p.title,
      description: traducao?.description ?? p.description,
      category: CATEGORIAS_PT[p.category] ?? p.category,
    };
  }
}
