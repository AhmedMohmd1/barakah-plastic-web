
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewToggle from "./products/ViewToggle";
import ProductGrid from "./products/ProductGrid";
import QuoteRequestModal from "./products/QuoteRequestModal";
import { ProductGridSkeleton } from "./ui/skeleton-card";
import ErrorBoundary from "./ErrorBoundary";
import { useIsMobile } from "@/hooks/use-mobile";
import { useProductQuote } from "@/hooks/useProductQuote";
import { PRODUCTS } from "@/constants/products";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Products = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const ref = useScrollAnimation();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { isModalOpen, selectedProduct, openQuoteModal, closeQuoteModal } = useProductQuote();

  useEffect(() => { if (isMobile) setViewMode("list"); }, [isMobile]);
  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 500); return () => clearTimeout(t); }, []);

  const handleViewChange = (mode: "grid" | "list") => { if (!isMobile) setViewMode(mode); };
  const openProductDetail = (productId: number) => navigate(`/products/${productId}`);

  return (
    <ErrorBoundary>
      <section id="products" className="section-padding bg-muted/30" ref={ref}>
        <div className="container-custom">
          <div className="text-center mb-14 scroll-animate">
            <span className="text-secondary font-semibold text-sm tracking-wide mb-2 block">ما نقدمه</span>
            <h2 className="heading-2 text-foreground mb-4">منتجاتنا</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              نقدم مجموعة متنوعة من الأكياس البلاستيكية عالية الجودة التي تناسب مختلف الاحتياجات
            </p>
          </div>

          <div className="scroll-animate">
            <ViewToggle viewMode={viewMode} onViewChange={handleViewChange} />
          </div>

          <div className="scroll-animate" style={{ transitionDelay: '150ms' }}>
            {isLoading ? (
              <ProductGridSkeleton />
            ) : (
              <ProductGrid
                products={PRODUCTS}
                viewMode={viewMode}
                hoveredProduct={hoveredProduct}
                onHover={setHoveredProduct}
                onViewDetails={openProductDetail}
                onQuoteRequest={openQuoteModal}
              />
            )}
          </div>
        </div>

        <QuoteRequestModal isOpen={isModalOpen} onClose={closeQuoteModal} productName={selectedProduct.name} productImage={selectedProduct.image} />
      </section>
    </ErrorBoundary>
  );
};

export default Products;
