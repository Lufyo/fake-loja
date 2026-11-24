// RESPONSÁVEL: Pessoa 6 (Service de favoritos)
//
// Requisito: Service 2 de 2, com outra funcionalidade que NÃO usa a API.
// Guarda os ids dos produtos favoritos e salva no localStorage do navegador.
//
// Onde aparece em tela: coração nos cards da Lista, botão na página Detalhes,
// contador de favoritos na Home e a página Favoritos (lista dos produtos favoritos).
import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private readonly CHAVE = 'loja-favoritos';

  // signal = valor que avisa a tela quando muda
  private ids = signal<number[]>(this.carregar());

  // quantidade de favoritos (recalculada sozinha)
  total = computed(() => this.ids().length);

  ehFavorito(id: number): boolean {
    return this.ids().includes(id);
  }

  alternar(id: number): void {
    if (this.ehFavorito(id)) {
      this.ids.update((lista) => lista.filter((x) => x !== id));
    } else {
      this.ids.update((lista) => [...lista, id]);
    }
    this.salvar();
  }

  // Descarta favoritos de produtos que não existem mais na loja (ex.: produtos que foram removidos).
  // Sem isso, o contador da Home poderia ser maior que a lista da página Favoritos.
  manterApenas(idsValidos: number[]): void {
    const atuais = this.ids();
    const restantes = atuais.filter((id) => idsValidos.includes(id));
    if (restantes.length !== atuais.length) {
      this.ids.set(restantes);
      this.salvar();
    }
  }

  private carregar(): number[] {
    try {
      return JSON.parse(localStorage.getItem(this.CHAVE) ?? '[]');
    } catch {
      return [];
    }
  }

  private salvar(): void {
    try {
      localStorage.setItem(this.CHAVE, JSON.stringify(this.ids()));
    } catch {
      // se o navegador bloquear o localStorage, o app continua funcionando
    }
  }
}
