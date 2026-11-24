// Formato dos dados devolvidos pela Fake Store API (https://fakestoreapi.com)
export interface Produto {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
