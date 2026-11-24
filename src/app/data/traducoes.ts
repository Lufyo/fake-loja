// RESPONSÁVEL: Pessoa 2 (Service da API)
//
// A Fake Store API devolve os produtos em inglês. Este arquivo guarda a tradução para português
// (Brasil) dos textos que aparecem em tela: título, descrição e categoria.
// O ProdutosService aplica estas traduções antes de entregar os dados para as páginas.
//
// Se a API devolver um produto ou categoria que não está aqui, o texto original é mantido.

export interface TraducaoProduto {
  title: string;
  description: string;
}

// Categorias: nome na API (inglês) -> nome exibido (português).
// Obs.: a API escreve "jewelery" (com erro de grafia), por isso a chave está assim.
export const CATEGORIAS_PT: Partial<Record<string, string>> = {
  electronics: 'eletrônicos',
  jewelery: 'joias',
  "men's clothing": 'roupas masculinas',
  "women's clothing": 'roupas femininas',
};

// Caminho inverso (português -> inglês): necessário porque a API só entende o nome original
// da categoria na rota /products/category/{nome}.
export const CATEGORIAS_ORIGINAIS: Partial<Record<string, string>> = Object.fromEntries(
  Object.entries(CATEGORIAS_PT).map(([original, traduzida]) => [traduzida, original]),
);

// Produtos: id na API -> título e descrição em português.
// Os ids 4, 7, 12 e 19 não estão aqui porque a loja não mostra mais esses produtos (veja produtos-extras.ts).
export const PRODUTOS_PT: Partial<Record<number, TraducaoProduto>> = {
  1: {
    title: 'Fjallraven - Mochila Foldsack Nº 1, Cabe Notebook de 15 Polegadas',
    description:
      'A mochila perfeita para o uso diário e para caminhadas na floresta. Guarde seu notebook (até 15 polegadas) no compartimento acolchoado e leve o que precisar no dia a dia.',
  },
  2: {
    title: 'Camisetas Masculinas Casuais Premium Slim Fit',
    description:
      'Modelagem slim, manga longa raglan contrastante, gola henley com três botões e tecido leve e macio, que respira e é confortável de vestir. As camisas têm costura reforçada e gola redonda, feitas para durar e ficar bem no visual casual, além de agradar os fãs fiéis de beisebol. A gola redonda estilo henley inclui uma abertura com três botões.',
  },
  3: {
    title: 'Jaqueta Masculina de Algodão',
    description:
      'Ótimas jaquetas para a primavera, o outono e o inverno, adequadas para diversas ocasiões: trabalho, trilhas, camping, escalada em montanha ou rocha, ciclismo, viagens e outras atividades ao ar livre. Uma boa opção de presente para você ou para alguém da família. Um gesto de carinho para o pai, o marido ou o filho no Dia de Ação de Graças ou no Natal.',
  },
  5: {
    title: 'Pulseira John Hardy Feminina Legends Naga, Corrente com Dragão em Ouro e Prata',
    description:
      'Da nossa Coleção Legends, a Naga foi inspirada no mítico dragão-d\'água que protege a pérola do oceano. Use voltada para dentro para receber amor e abundância, ou voltada para fora para proteção.',
  },
  6: {
    title: 'Micropavê Petite em Ouro Maciço',
    description:
      'Satisfação garantida. Devolva ou troque qualquer pedido em até 30 dias. Projetado e vendido pela Hafeez Center nos Estados Unidos.',
  },
  8: {
    title: 'Pierced Owl - Alargador Duplo em Aço Inoxidável Banhado a Ouro Rosé',
    description:
      'Brincos alargadores (tunnel plug) duplos de borda aberta, banhados a ouro rosé. Feitos em aço inoxidável 316L.',
  },
  9: {
    title: 'HD Externo Portátil WD Elements 2 TB - USB 3.0',
    description:
      'Compatível com USB 3.0 e USB 2.0. Transferência rápida de dados. Melhora o desempenho do PC. Alta capacidade. Formatado em NTFS para Windows 10, Windows 8.1 e Windows 7; pode ser necessário reformatar para outros sistemas operacionais. A compatibilidade pode variar conforme a configuração de hardware e o sistema operacional do usuário.',
  },
  10: {
    title: 'SSD Interno SanDisk SSD PLUS 1 TB - SATA III 6 Gb/s',
    description:
      'Upgrade fácil para inicialização, desligamento, abertura de aplicativos e resposta mais rápidos (em comparação com um HD SATA de 2,5" a 5400 RPM; com base em especificações publicadas e em testes internos de benchmark usando as pontuações do PCMark Vantage). Melhora o desempenho de gravação em rajadas, ideal para as cargas de trabalho típicas de um PC. O equilíbrio perfeito entre desempenho e confiabilidade. Velocidades de leitura/gravação de até 535 MB/s e 450 MB/s (com base em testes internos; o desempenho pode variar conforme a capacidade da unidade, o dispositivo host, o sistema operacional e o aplicativo).',
  },
  11: {
    title: 'SSD Silicon Power 256 GB 3D NAND A55 com Cache SLC para Maior Desempenho, SATA III 2,5"',
    description:
      'Memória flash 3D NAND para oferecer altas velocidades de transferência, que permitem inicialização mais rápida e melhor desempenho geral do sistema. A tecnologia avançada de cache SLC aumenta o desempenho e prolonga a vida útil. Design fino de 7 mm, adequado para ultrabooks e notebooks ultrafinos. Suporta o comando TRIM, coleta de lixo (Garbage Collection), RAID e ECC (verificação e correção de erros) para desempenho otimizado e maior confiabilidade.',
  },
  13: {
    title: 'Acer SB220Q bi - Monitor 21,5" Full HD (1920 x 1080) IPS Ultrafino',
    description:
      'Tela widescreen IPS Full HD (1920 x 1080) de 21,5 polegadas, com tecnologia Radeon FreeSync. Sem compatibilidade com suporte VESA. Taxa de atualização: 75 Hz (via porta HDMI). Design sem bordas, ultrafino, tempo de resposta de 4 ms e painel IPS. Proporção de tela: 16:9. Cores suportadas: 16,7 milhões. Brilho: 250 nits. Inclinação: de -5 a 15 graus. Ângulo de visão horizontal: 178 graus. Ângulo de visão vertical: 178 graus. 75 hertz.',
  },
  14: {
    title: 'Samsung CHG90 - Monitor Gamer Curvo 49" 144 Hz (LC49HG90DMNXZA) – Tela Super Ultrawide QLED',
    description:
      'MONITOR GAMER CURVO SUPER ULTRAWIDE 32:9 DE 49 POLEGADAS, equivalente a duas telas de 27 polegadas lado a lado. A tecnologia QUANTUM DOT (QLED), o suporte a HDR e a calibração de fábrica entregam cores e contraste incrivelmente realistas e precisos. A ALTA TAXA DE ATUALIZAÇÃO DE 144 HZ e o tempo de resposta ultrarrápido de 1 ms eliminam o desfoque de movimento e o efeito fantasma e reduzem o atraso de entrada.',
  },
  15: {
    title: 'BIYLACLESEN - Jaqueta Feminina de Snowboard 3 em 1, Casaco de Inverno',
    description:
      'Observação: as jaquetas seguem o tamanho padrão americano; escolha o tamanho que você costuma usar. Material: 100% poliéster. Forro removível em lã felpuda (fleece), quente, macio na pele e leve. Jaqueta com gola alta, que mantém você aquecido no frio. Bolsos com zíper: 2 bolsos de mão, 2 bolsos no peito (suficientes para cartões ou chaves) e 1 bolso interno escondido, que mantêm seus pertences seguros. Design pensado no conforto: capuz ajustável e removível e punhos ajustáveis para barrar o vento e a água, garantindo bom caimento. O design 3 em 1 oferece mais praticidade: você pode separar o casaco do forro conforme a necessidade ou usar os dois juntos. Serve para diferentes estações e ajuda a se adaptar a vários climas.',
  },
  16: {
    title: 'Lock and Love - Jaqueta Motociclista Feminina de Couro Sintético com Capuz Removível',
    description:
      '100% poliuretano (parte externa), 100% poliéster (forro) e 75% poliéster com 25% algodão (suéter). Couro sintético que une estilo e conforto. 2 bolsos frontais. Jaqueta de couro sintético 2 em 1, com capuz estilo jeans e detalhe de botões na cintura. Costuras decorativas nas laterais. LAVAR SOMENTE À MÃO / NÃO USAR ALVEJANTE / SECAR NO VARAL / NÃO PASSAR.',
  },
  17: {
    title: 'Jaqueta Corta-Vento Impermeável Feminina Listrada para Trilhas e Escalada',
    description:
      'Leve e perfeita para viagens ou uso casual. Manga longa, capuz e cintura com cordão ajustável. Capa de chuva com fechamento frontal de botões e zíper, totalmente forrada com listras. Os 2 bolsos laterais têm bom tamanho para guardar diversos itens, o comprimento cobre os quadris e o capuz é generoso sem exagero. O capuz forrado de algodão, com cordões ajustáveis, dá um visual estiloso.',
  },
  18: {
    title: 'MBJ - Blusa Feminina Lisa de Manga Curta com Gola Canoa em V',
    description:
      '95% raiom e 5% elastano. Fabricada nos EUA ou importada. Não usar alvejante. Tecido leve com ótima elasticidade para maior conforto. Acabamento canelado nas mangas e na gola. Barra com costura dupla.',
  },
  20: {
    title: 'DANVOUY - Camiseta Feminina Casual de Algodão, Manga Curta',
    description:
      '95% algodão e 5% elastano. Características: casual, manga curta, estampa de letras, gola V, camiseta fashion. O tecido é macio e tem um pouco de elasticidade. Ocasiões: casual, escritório, praia, escola, casa e rua. Estações: primavera, verão, outono e inverno.',
  },
};
