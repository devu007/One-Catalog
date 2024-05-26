import React, { useRef, useEffect } from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
  }

const Modal = ({ show , onClose, children,className }:ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event:any) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`bg-white p-6 rounded-lg shadow-lg overflow-y-auto ${className}`} ref={modalRef}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
