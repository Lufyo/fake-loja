// RESPONSÁVEL: Pessoa 1 (Home, rotas e configuração)
//
// Página inicial: apresenta a loja e leva para a Lista e para os Favoritos.
// Usa o pipe built-in `uppercase` e o bloco @if (mostra o contador de favoritos).
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { heart, storefront } from 'ionicons/icons';
import { FavoritosService } from '../../services/favoritos.service';
import { UpperCasePipe } from '../../pipes/builtin.pipes';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  imports: [RouterLink, UpperCasePipe, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon],
})
export class HomePage {
  favoritos = inject(FavoritosService);
  nomeLoja = 'Loja Fake';

  constructor() {
    addIcons({ storefront, heart });
  }
}
