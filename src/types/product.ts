
export interface Specification {
  name: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  images?: string[];
  badge?: string;
  specifications?: Specification[];
  rating?: number;
  reviewCount?: string;
}

export interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  hoveredProduct: number | null;
  onHover: (id: number | null) => void;
  onViewDetails: (id: number) => void;
}

export interface QuoteRequestData {
  productName: string;
  productImage: string;
  phone: string;
  note?: string;
}
