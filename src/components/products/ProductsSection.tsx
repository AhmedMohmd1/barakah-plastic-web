
import React from 'react';
import { cn } from "@/lib/utils";

interface ProductsSectionProps {
  viewMode: 'grid' | 'list';
  children: React.ReactNode;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ viewMode, children }) => {
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
