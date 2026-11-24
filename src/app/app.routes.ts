// RESPONSÁVEL: Pessoa 1 (Home, rotas e configuração)
// Requisito: no mínimo 3 pages além do Home -> Lista, Detalhes e Favoritos.
// Requisito extra: parâmetro por rota -> 'detalhes/:id' (Pessoa 3 lê o :id).
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'lista',
    loadComponent: () => import('./pages/lista/lista.page').then((m) => m.ListaPage),
  },
  {
    path: 'detalhes/:id',
    loadComponent: () => import('./pages/detalhes/detalhes.page').then((m) => m.DetalhesPage),
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./pages/favoritos/favoritos.page').then((m) => m.FavoritosPage),
  },
];
