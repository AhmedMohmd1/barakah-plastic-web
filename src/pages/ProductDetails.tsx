
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
import { ArrowLeft } from "lucide-react";
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
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/')}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/')}>الرئيسية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/#products')}>المنتجات</BreadcrumbLink>
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
