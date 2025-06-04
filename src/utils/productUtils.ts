/**
 * Product utility functions for managing product data and operations
 */

import { Product } from '@/types/product';

/**
 * Retrieves a product by its ID from the products array
 * @param products Array of products to search through
 * @param id Product ID to find
 * @returns Product object if found, undefined otherwise
 */
export const getProductById = (products: Product[], id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

/**
 * Gets all images for a product, using the main image as fallback
 * @param product Product object containing image data
 * @returns Array of image URLs
 */
export const getProductImages = (product: Product): string[] => {
  if (!product.images?.length) {
    return [product.image];
  }
  return product.images.filter(img => img && img.trim() !== '');
};

/**
 * Gets product specifications with fallback to empty array
 * @param product Product object containing specifications
 * @returns Array of product specifications
 */
export const getProductSpecs = (product: Product) => {
  return product.specifications || [];
};

/**
 * Gets product rating information with defaults
 * @param product Product object containing rating data
 * @returns Object containing rating and review count
 */
export const getProductRating = (product: Product) => {
  return {
    rating: product.rating || 0,
    reviewCount: product.reviewCount || '0 تقييم'
  };
};