
import React from 'react';
import { Star } from 'lucide-react';

interface ProductInfoProps {
  title: string;
  description: string;
  rating: number;
  reviewCount: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  description,
  rating,
  reviewCount,
}) => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                fill={star <= Math.floor(rating) ? "currentColor" : "none"}
                className={`h-5 w-5 ${star <= Math.floor(rating) ? 'text-amber-500' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="font-semibold">{rating}</span>
          <span className="text-sm text-muted-foreground">{reviewCount}</span>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">وصف المنتج</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </>
  );
};

export default ProductInfo;
