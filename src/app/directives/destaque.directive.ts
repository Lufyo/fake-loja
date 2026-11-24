// RESPONSÁVEL: Pessoa 5 (Diretivas personalizadas)
//
// DIRETIVA PERSONALIZADA 1 de 2 (usa @HostListener)
// O que faz: quando o mouse passa por cima do elemento, ele cresce um pouco e ganha sombra.
// Uso na tela: <ion-card appDestaque> ... </ion-card>
// Aparece em: cards da Lista e da página Favoritos.
import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({ selector: '[appDestaque]' })
export class DestaqueDirective {
  private el = inject(ElementRef<HTMLElement>);

  constructor() {
    this.el.nativeElement.style.transition = 'transform 0.2s, box-shadow 0.2s';
  }

  @HostListener('mouseenter')
  aoEntrar(): void {
    this.el.nativeElement.style.transform = 'scale(1.03)';
    this.el.nativeElement.style.boxShadow = '6px 6px 0 #2b45e8';
  }

  @HostListener('mouseleave')
  aoSair(): void {
    this.el.nativeElement.style.transform = 'scale(1)';
    this.el.nativeElement.style.boxShadow = '';
  }
}
