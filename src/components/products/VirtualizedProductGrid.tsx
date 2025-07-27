import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface VirtualizedProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  hoveredProduct: number | null;
  onHover: (id: number | null) => void;
  onViewDetails: (id: number) => void;
  onQuoteRequest: (productName: string, productImage: string) => void;
  itemHeight?: number;
  containerHeight?: number;
}

const VirtualizedProductGrid: React.FC<VirtualizedProductGridProps> = ({
  products,
  viewMode,
  hoveredProduct,
  onHover,
  onViewDetails,
  onQuoteRequest,
  itemHeight = 400,
  containerHeight = 800,
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      products.length
    );
    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, products.length]);

  // Get visible products
  const visibleProducts = useMemo(() => {
    return products.slice(visibleRange.startIndex, visibleRange.endIndex);
  }, [products, visibleRange]);

  // Calculate total height
  const totalHeight = products.length * itemHeight;

  // Calculate offset for visible items
  const offsetY = visibleRange.startIndex * itemHeight;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      className="overflow-auto"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: offsetY,
            left: 0,
            right: 0,
          }}
        >
          {visibleProducts.map((product, index) => (
            <div
              key={product.id}
              style={{ height: itemHeight }}
              className={viewMode === 'grid' ? 'inline-block w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2' : 'w-full mb-4'}
            >
              <ProductCard
                product={product}
                viewMode={viewMode}
                hoveredProduct={hoveredProduct}
                onHover={onHover}
                onViewDetails={onViewDetails}
                onQuoteRequest={onQuoteRequest}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualizedProductGrid; 