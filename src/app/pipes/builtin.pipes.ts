// RESPONSÁVEL: Pessoa 4 (Pipes)
//
// PIPES BUILT-IN (as 2 do requisito + 2 extras)
// Estas pipes já vêm prontas no Angular (@angular/common), então não há código para escrever:
// este arquivo só reúne todas num lugar, ao lado das pipes personalizadas desta pasta.
// As páginas importam daqui: import { UpperCasePipe } from '../../pipes/builtin.pipes';
//
//  - TitleCasePipe  (titlecase): "roupas masculinas" -> "Roupas Masculinas"  | Lista (categoria)
//  - UpperCasePipe  (uppercase): "Loja Fake" -> "LOJA FAKE"                 | Home (nome da loja) e Detalhes (categoria)
//  - CurrencyPipe   (currency):  109.95 -> "US$ 109,95"                     | Detalhes (preço original em dólar)
//  - DecimalPipe    (number):    3.9 -> "3,9"                               | Lista e Detalhes (nota)
export { TitleCasePipe, UpperCasePipe, CurrencyPipe, DecimalPipe } from '@angular/common';
