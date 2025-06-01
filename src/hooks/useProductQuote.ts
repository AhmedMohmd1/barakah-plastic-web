
import { useState } from 'react';
import { QuoteRequestData } from '@/types/product';

export const useProductQuote = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    name: string;
    image: string;
  }>({ name: '', image: '' });

  const openQuoteModal = (productName: string, productImage: string) => {
    setSelectedProduct({ name: productName, image: productImage });
    setIsModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsModalOpen(false);
    setSelectedProduct({ name: '', image: '' });
  };

  const submitQuoteRequest = (data: QuoteRequestData) => {
    // Here you would typically send the data to your server
    console.log('Quote request submitted:', data);
    alert('تم إرسال الطلب بنجاح!');
    closeQuoteModal();
  };

  return {
    isModalOpen,
    selectedProduct,
    openQuoteModal,
    closeQuoteModal,
    submitQuoteRequest,
  };
};
