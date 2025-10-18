// frontend/src/hooks/use-expert-consultation.js
import { useState } from 'react';

export const useExpertConsultation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    openModal,
    closeModal
  };
};