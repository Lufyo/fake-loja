// RESPONSÁVEL: Pessoa 4 (Pipes)
//
// PIPE PERSONALIZADA 1 de 2
// O que faz: converte o preço (em dólar) para reais e formata como "R$ 1.234,56".
// Uso na tela: {{ produto.price | preco }}  ou  {{ produto.price | preco:6 }}
// Aparece em: Lista e Favoritos (card do produto) e Detalhes.
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'preco' })
export class PrecoPipe implements PipeTransform {
  transform(valorEmDolar: number, cotacao: number = 5.5): string {
    const emReais = valorEmDolar * cotacao;
    return emReais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
