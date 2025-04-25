
import React from 'react';
import GridProductCard from './GridProductCard';
import ListProductCard from './ListProductCard';
import { ProductCardProps } from './types';

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode,
  hoveredProduct,
  onHover,
  onViewDetails,
}) => {
  if (viewMode === 'list') {
    return (
      <ListProductCard
        product={product}
        hoveredProduct={hoveredProduct}
        onHover={onHover}
        onViewDetails={onViewDetails}
      />
    );
  }

  return (
    <GridProductCard
      product={product}
      hoveredProduct={hoveredProduct}
      onHover={onHover}
      onViewDetails={onViewDetails}
    />
  );
};

export default ProductCard;
