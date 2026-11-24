// RESPONSÁVEL: Pessoa 6 (página Favoritos)
//
// Página Favoritos: mostra só os produtos marcados com o coração.
// Os ids vêm do FavoritosService (guardados no localStorage) e os dados dos produtos vêm do ProdutosService.
// Tirar o coração aqui remove o card na hora, porque `salvos` é um computed que acompanha o signal de ids.
// Usa: blocos @if / @for, pipes (preco, resumo, titlecase, number) e as duas diretivas personalizadas.
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
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { heart, heartOutline, star, storefront } from 'ionicons/icons';
import { Produto } from '../../models/produto.model';
import { ProdutosService } from '../../services/produtos.service';
import { FavoritosService } from '../../services/favoritos.service';
import { DecimalPipe, TitleCasePipe } from '../../pipes/builtin.pipes';
import { PrecoPipe } from '../../pipes/preco.pipe';
import { ResumoPipe } from '../../pipes/resumo.pipe';
import { DestaqueDirective } from '../../directives/destaque.directive';
import { AvaliacaoCorDirective } from '../../directives/avaliacao-cor.directive';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrl: './favoritos.page.scss',
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
export class FavoritosPage implements OnInit {
  private produtosService = inject(ProdutosService);
  favoritos = inject(FavoritosService);

  produtos = signal<Produto[]>([]);
  carregando = signal(true);
  erro = signal(false);

  // só os produtos favoritados; recalcula sozinho quando o coração é marcado ou desmarcado
  salvos = computed(() => this.produtos().filter((p) => this.favoritos.ehFavorito(p.id)));

  constructor() {
    addIcons({ heart, heartOutline, star, storefront });
  }

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando.set(true);
    this.erro.set(false);

    this.produtosService.listarTodos().subscribe({
      next: (lista) => {
        this.produtos.set(lista);
        // descarta favoritos de produtos que a loja não vende mais, para o contador bater com a lista
        this.favoritos.manterApenas(lista.map((p) => p.id));
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set(true);
        this.carregando.set(false);
      },
    });
  }

  alternarFavorito(evento: Event, id: number): void {
    evento.stopPropagation(); // evita abrir a página Detalhes ao clicar no coração
    this.favoritos.alternar(id);
  }
}
