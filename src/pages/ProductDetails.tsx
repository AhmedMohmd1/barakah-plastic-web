import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetailContent from '@/components/products/ProductDetailContent';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProductById } from '@/utils/productUtils';
import { PRODUCTS } from '@/constants/products';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!productId || isNaN(Number(productId))) {
    return (
      <div className="container-custom py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-primary mb-4">معرف المنتج غير صالح</h2>
          <p className="text-muted-foreground mb-4">عذراً، معرف المنتج المطلوب غير صحيح.</p>
          <Button onClick={() => navigate('/')}>العودة للرئيسية</Button>
        </div>
      </div>
    );
  }

  const product = getProductById(PRODUCTS, parseInt(productId));

  if (!product) {
    return (
      <div className="container-custom py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-primary mb-4">المنتج غير موجود</h2>
          <p className="text-muted-foreground mb-4">عذراً، لم نتمكن من العثور على المنتج المطلوب.</p>
          <Button onClick={() => navigate('/')}>العودة للرئيسية</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="mb-6" dir="rtl">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}
                className="cursor-pointer hover:underline hover:text-primary transition-colors"
              >
                الرئيسية
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/#products"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/', { replace: false });
                  setTimeout(() => {
                    const el = document.getElementById('products');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="cursor-pointer hover:underline hover:text-primary transition-colors"
              >
                المنتجات
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ProductDetailContent productId={parseInt(productId)} />
    </div>
  );
};

export default ProductDetails;
