/**
 * Custom hook for managing product quote requests.
 * Owns only the modal open/close state and the selected product — the actual
 * submission (POST to SheetDB) lives inside RequestQuoteModal.
 */

import { useState } from 'react';

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

  return {
    isModalOpen,
    selectedProduct,
    openQuoteModal,
    closeQuoteModal,
  };
};