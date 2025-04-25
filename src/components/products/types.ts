
export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  badge?: string;
}

export interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  hoveredProduct: number | null;
  onHover: (id: number | null) => void;
  onViewDetails: (id: number) => void;
}
