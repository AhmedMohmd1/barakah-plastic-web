import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  hoveredProduct: number | null;
  onHover: (id: number | null) => void;
  onViewDetails: (id: number) => void;
  onQuoteRequest: (productName: string, productImage: string) => void;
}

/**
 * Grid layout component for displaying products
 * Supports both grid and list view modes
 */
const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  viewMode,
  hoveredProduct,
  onHover,
  onViewDetails,
  onQuoteRequest,
}) => {
  const gridClasses = viewMode === 'grid' 
    ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    : "space-y-6";

  return (
    <div className={gridClasses}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          viewMode={viewMode}
          hoveredProduct={hoveredProduct}
          onHover={onHover}
          onViewDetails={onViewDetails}
          onQuoteRequest={onQuoteRequest}
        />
      ))}
    </div>
  );
};

export default ProductGrid;