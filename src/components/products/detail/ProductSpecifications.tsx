
import React from 'react';

interface Specification {
  name: string;
  value: string;
}

interface ProductSpecificationsProps {
  specs: Specification[];
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({ specs }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">المواصفات</h3>
      <div className="space-y-3">
        {specs.map((spec, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
            <div className="w-3 h-3 rounded-full bg-secondary shrink-0"></div>
            <div>
              <span className="font-medium">{spec.name}</span>
              <span className="mx-2">-</span>
              <span className="text-gray-600">{spec.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSpecifications;
