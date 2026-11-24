// RESPONSÁVEL: Pessoa 5 (Diretivas personalizadas)
//
// DIRETIVA PERSONALIZADA 2 de 2 (usa @HostBinding)
// O que faz: pinta a nota do produto: verde (>= 4), laranja (>= 3) ou vermelho (abaixo de 3).
// Uso na tela: <span [appAvaliacaoCor]="produto.rating.rate">...</span>
// Aparece em: Lista e Favoritos (nota do card) e Detalhes.
import { Directive, HostBinding, Input } from '@angular/core';

@Directive({ selector: '[appAvaliacaoCor]' })
export class AvaliacaoCorDirective {
  @Input('appAvaliacaoCor') nota = 0;

  @HostBinding('style.color')
  get cor(): string {
    // tons mais escuros para o texto ser legível sobre fundo branco
    if (this.nota >= 4) return '#15803d';
    if (this.nota >= 3) return '#b45309';
    return '#dc2626';
  }

  @HostBinding('style.fontWeight')
  peso = 'bold';
}
