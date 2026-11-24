// RESPONSÁVEL: Pessoa 2 (consumo da API) + Pessoa 5 (@for e diretivas) + Pessoa 6 (favoritos)
//
// Página Lista: busca os produtos na API, filtra por categoria e por texto.
// Usa: ProdutosService (GET), FavoritosService, pipes (preco, resumo, titlecase, number),
//      diretivas (appDestaque, appAvaliacaoCor) e blocos @if / @for.
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { heart, heartOutline, star } from 'ionicons/icons';
import { Produto } from '../../models/produto.model';
import { ProdutosService } from '../../services/produtos.service';
import { FavoritosService } from '../../services/favoritos.service';
import { DecimalPipe, TitleCasePipe } from '../../pipes/builtin.pipes';
import { PrecoPipe } from '../../pipes/preco.pipe';
import { ResumoPipe } from '../../pipes/resumo.pipe';
import { DestaqueDirective } from '../../directives/destaque.directive';
import { AvaliacaoCorDirective } from '../../directives/avaliacao-cor.directive';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrl: './lista.page.scss',
  imports: [
    RouterLink,
    DecimalPipe,
    TitleCasePipe,
    PrecoPipe,
    ResumoPipe,
    DestaqueDirective,
    AvaliacaoCorDirective,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonSpinner,
  ],
})
export class ListaPage implements OnInit {
  private produtosService = inject(ProdutosService);
  favoritos = inject(FavoritosService);

  produtos = signal<Produto[]>([]);
  categorias = signal<string[]>([]);
  categoriaAtual = signal('todos');
  busca = signal('');
  carregando = signal(true);
  erro = signal(false);

  // lista que aparece na tela: produtos filtrados pelo texto da busca
  filtrados = computed(() => {
    const termo = this.busca().toLowerCase().trim();
    return this.produtos().filter((p) => p.title.toLowerCase().includes(termo));
  });

  constructor() {
    addIcons({ heart, heartOutline, star });
  }

  ngOnInit(): void {
    this.produtosService.listarCategorias().subscribe({
      next: (cats) => this.categorias.set(cats),
    });
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.carregando.set(true);
    this.erro.set(false);

    const categoria = this.categoriaAtual();
    const requisicao =
      categoria === 'todos'
        ? this.produtosService.listarTodos()
        : this.produtosService.listarPorCategoria(categoria);

    requisicao.subscribe({
      next: (lista) => {
        this.produtos.set(lista);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set(true);
        this.carregando.set(false);
      },
    });
  }

  trocarCategoria(valor: string | number | null | undefined): void {
    this.categoriaAtual.set(String(valor ?? 'todos'));
    this.carregarProdutos();
  }

  buscar(texto: string | null | undefined): void {
    this.busca.set(texto ?? '');
  }

  alternarFavorito(evento: Event, id: number): void {
    evento.stopPropagation(); // evita abrir a página Detalhes ao clicar no coração
    this.favoritos.alternar(id);
  }
}
