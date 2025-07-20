
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ImageGallery from './detail/ImageGallery';
import ProductInfo from './detail/ProductInfo';
import ProductSpecifications from './detail/ProductSpecifications';
import QuoteRequestModal from './QuoteRequestModal';
import { ProductDetailSkeleton } from '@/components/ui/skeleton-card';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useProductQuote } from '@/hooks/useProductQuote';
import { getProductById, getProductImages, getProductSpecs, getProductRating } from '@/utils/productUtils';
import { PRODUCTS } from '@/constants/products';

interface ProductDetailContentProps {
  productId: number;
}

const ProductDetailContent: React.FC<ProductDetailContentProps> = ({ productId }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const {
    isModalOpen,
    selectedProduct,
    openQuoteModal,
    closeQuoteModal,
  } = useProductQuote();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [productId]);

  const product = getProductById(PRODUCTS, productId);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-primary mb-4">المنتج غير موجود</h2>
        <p className="text-muted-foreground">عذراً، لم نتمكن من العثور على المنتج المطلوب.</p>
      </div>
    );
  }

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  const images = getProductImages(product);
  const specs = getProductSpecs(product);
  const { rating, reviewCount } = getProductRating(product);

  const handleZoom = (image: string) => {
    setZoomedImage(image);
  };

  const handleQuoteRequest = () => {
    openQuoteModal(product.name, product.image);
  };

  return (
    <ErrorBoundary>
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <ImageGallery
            images={images}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
            onZoom={handleZoom}
          />
        </div>

        <div className="space-y-6">
          <ProductInfo
            title={product.name}
            description={product.description}
            rating={rating}
            reviewCount={reviewCount}
          />

          {specs.length > 0 && <ProductSpecifications specs={specs} />}

          <div className="space-y-3">
            <Button 
              size="lg" 
              className="w-full"
              onClick={handleQuoteRequest}
            >
              طلب عرض سعر
            </Button>
          </div>
        </div>
      </div>

      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setZoomedImage(null)}
        >
          <img
            src={zoomedImage}
            alt="Zoomed product"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      <QuoteRequestModal
        isOpen={isModalOpen}
        onClose={closeQuoteModal}
        productName={selectedProduct.name}
        productImage={selectedProduct.image}
      />
    </ErrorBoundary>
  );
};

export default ProductDetailContent;
