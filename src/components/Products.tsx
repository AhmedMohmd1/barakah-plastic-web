import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewToggle from "./products/ViewToggle";
import ProductGrid from "./products/ProductGrid";
import QuoteRequestModal from "./products/QuoteRequestModal";
import { useIsMobile } from "@/hooks/use-mobile";
import { useProductQuote } from "@/hooks/useProductQuote";
import { PRODUCTS } from "@/constants/products";

/**
 * Products section component
 * Displays product catalog with grid/list view toggle
 */
const Products = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  
  const {
    isModalOpen,
    selectedProduct,
    openQuoteModal,
    closeQuoteModal,
  } = useProductQuote();

  // Force list view on mobile devices
  useEffect(() => {
    if (isMobile) {
      setViewMode("list");
    }
  }, [isMobile]);

  const handleViewChange = (mode: "grid" | "list") => {
    if (!isMobile) {
      setViewMode(mode);
    }
  };

  const openProductDetail = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  return (
    <section id="products" className="section-padding bg-slate-100 py-[42px]">
      <div className="container-custom my-0 py-0 bg-slate-100">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-primary mb-4">منتجاتنا</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            نقدم مجموعة متنوعة من الأكياس البلاستيكية عالية الجودة التي تناسب
            مختلف الاحتياجات
          </p>
        </div>

        <ViewToggle viewMode={viewMode} onViewChange={handleViewChange} />

        <ProductGrid
          products={PRODUCTS}
          viewMode={viewMode}
          hoveredProduct={hoveredProduct}
          onHover={setHoveredProduct}
          onViewDetails={openProductDetail}
          onQuoteRequest={openQuoteModal}
        />
      </div>

      <QuoteRequestModal
        isOpen={isModalOpen}
        onClose={closeQuoteModal}
        productName={selectedProduct.name}
        productImage={selectedProduct.image}
      />
    </section>
  );
};

export default Products;