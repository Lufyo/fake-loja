// RESPONSÁVEL: Pessoa 4 (Pipes)
//
// PIPE PERSONALIZADA 2 de 2
// O que faz: corta um texto grande e coloca "..." no final.
// Uso na tela: {{ produto.title | resumo:60 }}
// Aparece em: Lista e Favoritos (título do card).
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'resumo' })
export class ResumoPipe implements PipeTransform {
  transform(texto: string, limite: number = 50): string {
    if (!texto) return '';
    return texto.length > limite ? texto.substring(0, limite).trim() + '...' : texto;
  }
}
