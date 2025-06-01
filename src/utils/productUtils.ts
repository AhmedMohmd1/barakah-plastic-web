
import { Product } from '@/types/product';

export const getProductById = (products: Product[], id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductImages = (product: Product): string[] => {
  return product.images && product.images.length > 0 
    ? product.images 
    : [product.image];
};

export const getProductSpecs = (product: Product) => {
  return product.specifications || [];
};

export const getProductRating = (product: Product) => {
  return {
    rating: product.rating || 0,
    reviewCount: product.reviewCount || '0 تقييم'
  };
};
