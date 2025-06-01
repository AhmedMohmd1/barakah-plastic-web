
import React from 'react';
import GridProductCard from './GridProductCard';
import ListProductCard from './ListProductCard';
import { ProductCardProps } from './types';

interface ExtendedProductCardProps extends ProductCardProps {
  onQuoteRequest: (productName: string, productImage: string) => void;
}

const ProductCard: React.FC<ExtendedProductCardProps> = ({
  product,
  viewMode,
  hoveredProduct,
  onHover,
  onViewDetails,
  onQuoteRequest,
}) => {
  if (viewMode === 'list') {
    return (
      <ListProductCard
        product={product}
        hoveredProduct={hoveredProduct}
        onHover={onHover}
        onViewDetails={onViewDetails}
        onQuoteRequest={onQuoteRequest}
      />
    );
  }

  return (
    <GridProductCard
      product={product}
      hoveredProduct={hoveredProduct}
      onHover={onHover}
      onViewDetails={onViewDetails}
      onQuoteRequest={onQuoteRequest}
    />
  );
};

export default ProductCard;
