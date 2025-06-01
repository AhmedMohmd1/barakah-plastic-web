import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./products/ProductCard";
import ViewToggle from "./products/ViewToggle";
import ProductsSection from "./products/ProductsSection";
import QuoteRequestModal from "./products/QuoteRequestModal";
import { useIsMobile } from "@/hooks/use-mobile";

const Products = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    name: string;
    image: string;
  }>({ name: '', image: '' });

  // Force list view on mobile
  useEffect(() => {
    if (isMobile) {
      setViewMode("list");
    }
  }, [isMobile]);

  const openProductDetail = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const handleViewChange = (mode: "grid" | "list") => {
    // Only allow view changes on non-mobile devices
    if (!isMobile) {
      setViewMode(mode);
    }
  };

  const handleQuoteRequest = (productName: string, productImage: string) => {
    setSelectedProduct({ name: productName, image: productImage });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct({ name: '', image: '' });
  };

  const products = [
    {
      id: 1,
      name: "شُنط مطبوعة بشعارك",
      description:
        "أكياس شراء مخصصة عالية الجودة مع طباعة احترافية لشعار شركتك. مصنوعة من مواد متينة وصديقة للبيئة، مثالية لتعزيز هوية علامتك التجارية وتقديم تجربة تسوق مميزة لعملائك.",
      image: "images/plasticbag.jpeg",
    },
    {
      id: 2,
      name: "شنط سوفت للمحلات الملابس",
      description:
        "شنط ناعمة خاصة لمحلات الملابس بتصاميم أنيقة وراقية، مثالية لتعزيز تجربة التسوق",
      image: "/images/softBags.jpg",
    },
    {
      id: 3,
      name: "شنط قماش",
      description:
        "شنط قماش صديقة للبيئة متعددة الاستخدامات بتصاميم عصرية، مثالية للتسوق وحمل المشتريات اليومية",
      image: "/images/canvas.jpeg",
    },
    {
      id: 4,
      name: "اكياس سلوفان بشريطه",
      description:
        "أكياس سلوفان شفافة مع شريط لاصق للإغلاق المحكم، مثالية لتغليف المنتجات الصغيرة والهدايا بشكل أنيق",
      image: "/images/كيس سلوفان.jpeg",
    },
    {
      id: 5,
      name: "اكياس ذات غالق - ziplock bags",
      description:
        "أكياس بسحاب قابلة للإغلاق والفتح، مناسبة لحفظ الطعام والمنتجات، متوفرة بأحجام مختلفة",
      image: "/images/اكياس-بقفل.png",
    },
  ];

  return (
    <>
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

          <ProductsSection viewMode={viewMode}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
                hoveredProduct={hoveredProduct}
                onHover={setHoveredProduct}
                onViewDetails={openProductDetail}
                onQuoteRequest={handleQuoteRequest}
              />
            ))}
          </ProductsSection>
        </div>
      </section>

      <QuoteRequestModal
        isOpen={isModalOpen}
        onClose={closeModal}
        productName={selectedProduct.name}
        productImage={selectedProduct.image}
      />
    </>
  );
};

export default Products;
