/**
 * Custom hook for managing product quote requests
 * Handles modal state and quote submission logic
 */

import { useState } from 'react';
import { QuoteRequestData } from '@/types/product';

export const useProductQuote = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    name: string;
    image: string;
  }>({ name: '', image: '' });

  /**
   * Opens the quote request modal with product details
   */
  const openQuoteModal = (productName: string, productImage: string) => {
    setSelectedProduct({ name: productName, image: productImage });
    setIsModalOpen(true);
  };

  /**
   * Closes the quote request modal and resets selected product
   */
  const closeQuoteModal = () => {
    setIsModalOpen(false);
    setSelectedProduct({ name: '', image: '' });
  };

  /**
   * Handles quote request submission
   * @param data Quote request data from the form
   */
  const submitQuoteRequest = (data: QuoteRequestData) => {
    // TODO: Implement actual API call
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