import { useState } from "react";

export interface DisclosureProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return { isOpen, onToggle, onOpen, onClose };
};
