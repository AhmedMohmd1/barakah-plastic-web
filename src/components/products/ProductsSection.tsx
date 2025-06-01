import React from 'react';

interface ProductsSectionProps {
  viewMode: 'grid' | 'list';
  children: React.ReactNode;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ viewMode, children }) => {
  // This component is now deprecated in favor of ProductGrid
  // Keeping for backward compatibility
  return viewMode === 'grid' ? (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {children}
    </div>
  ) : (
    <div className="space-y-6">
      {children}
    </div>
  );
};

export default ProductsSection;
