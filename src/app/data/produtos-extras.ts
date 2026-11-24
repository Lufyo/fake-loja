// RESPONSÁVEL: Pessoa 2 (Service da API)
//
// Ajustes no catálogo da Fake Store API:
//  - IDS_REMOVIDOS: produtos da API que a loja não mostra mais.
//  - PRODUTOS_EXTRAS: produtos criados só para esta loja (já em português), com ilustrações
//    na pasta public/produtos/.
// O ProdutosService junta tudo: produtos da API (menos os removidos) + os extras.
import { Produto } from '../models/produto.model';

// 4 = camisa casual slim fit, 7 = anel princess, 12 = HD gamer 4 TB, 19 = camiseta Opna.
export const IDS_REMOVIDOS: number[] = [4, 7, 12, 19];

// Os ids começam em 101 para nunca colidir com os ids da API (1 a 20).
// As categorias usam os mesmos nomes em português que o service mostra para os produtos da API.
// "casa" não existe na API: é uma categoria nova, só dos produtos extras.
export const PRODUTOS_EXTRAS: Produto[] = [
  {
    id: 101,
    title: 'Fone de Ouvido Bluetooth Sonora X2',
    price: 54.9,
    description:
      'Fone over-ear sem fio com Bluetooth 5.3, cancelamento de ruído e até 40 horas de bateria. Almofadas macias, estrutura dobrável para guardar na mochila e microfone embutido para chamadas.',
    category: 'eletrônicos',
    image: 'produtos/fone.svg',
    rating: { rate: 4.6, count: 312 },
  },
  {
    id: 102,
    title: 'Smartwatch Pulso Lite com Monitor de Batimentos',
    price: 79,
    description:
      'Relógio inteligente com tela colorida, monitor de batimentos cardíacos, contador de passos e notificações do celular. Resistente a respingos e com bateria para até 7 dias.',
    category: 'eletrônicos',
    image: 'produtos/relogio.svg',
    rating: { rate: 3.8, count: 187 },
  },
  {
    id: 103,
    title: 'Boné Masculino Aba Curva em Sarja',
    price: 14.9,
    description:
      'Boné de sarja de algodão com aba curva, seis gomos e ajuste traseiro de fivela. Leve, resistente e combina com qualquer visual casual.',
    category: 'roupas masculinas',
    image: 'produtos/bone.svg',
    rating: { rate: 4.4, count: 143 },
  },
  {
    id: 104,
    title: 'Garrafa Térmica de Aço Inox 750 ml',
    price: 21.9,
    description:
      'Mantém bebidas geladas por 24 horas e quentes por 12. Corpo de aço inoxidável com parede dupla a vácuo, tampa rosqueável e boca larga para colocar gelo.',
    category: 'casa',
    image: 'produtos/garrafa.svg',
    rating: { rate: 4.7, count: 538 },
  },
  {
    id: 105,
    title: 'Caneca de Cerâmica Esmaltada 350 ml',
    price: 9.5,
    description:
      'Caneca com esmalte brilhante, alça ergonômica e capacidade para 350 ml. Pode ir ao micro-ondas e à lava-louças.',
    category: 'casa',
    image: 'produtos/caneca.svg',
    rating: { rate: 4.5, count: 264 },
  },
  {
    id: 106,
    title: 'Luminária de Mesa LED com Braço Articulado',
    price: 27.9,
    description:
      'Luminária com braço articulado, três níveis de brilho e luz que muda de quente para fria. Base estável e cabo USB incluído.',
    category: 'casa',
    image: 'produtos/luminaria.svg',
    rating: { rate: 4.1, count: 96 },
  },
];
