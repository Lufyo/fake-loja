// RESPONSÁVEL: Pessoa 3 (Detalhes + parâmetro de rota)
//
// PONTO EXTRA: recebe o :id da rota ('detalhes/:id'), enviado pela página Lista.
// Fluxo: clicou no card na Lista -> rota /detalhes/5 -> aqui lemos o 5 com ActivatedRoute
//        -> chamamos o GET buscarPorId(5) -> mostramos o produto.
// Usa os blocos @if / @else, pipes built-in (currency, number, uppercase)
// e as pipes/diretivas personalizadas.
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { heart, heartOutline, star } from 'ionicons/icons';
import { Produto } from '../../models/produto.model';
import { ProdutosService } from '../../services/produtos.service';
import { FavoritosService } from '../../services/favoritos.service';
import { CurrencyPipe, DecimalPipe, UpperCasePipe } from '../../pipes/builtin.pipes';
import { PrecoPipe } from '../../pipes/preco.pipe';
import { AvaliacaoCorDirective } from '../../directives/avaliacao-cor.directive';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrl: './detalhes.page.scss',
  imports: [
    CurrencyPipe,
    DecimalPipe,
    UpperCasePipe,
    PrecoPipe,
    AvaliacaoCorDirective,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonButton,
    IonIcon,
    IonSpinner,
  ],
})
export class DetalhesPage implements OnInit {
  private route = inject(ActivatedRoute);
  private produtosService = inject(ProdutosService);
  favoritos = inject(FavoritosService);

  produto = signal<Produto | null>(null);
  carregando = signal(true);
  erro = signal(false);

  constructor() {
    addIcons({ heart, heartOutline, star });
  }

  ngOnInit(): void {
    // Lê o parâmetro :id que veio na URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.produtosService.buscarPorId(id).subscribe({
      next: (produto) => {
        this.produto.set(produto);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set(true);
        this.carregando.set(false);
      },
    });
  }

  alternarFavorito(id: number): void {
    this.favoritos.alternar(id);
  }
}
