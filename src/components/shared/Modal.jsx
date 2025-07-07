'use client';
import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Modal = ({
  children,
  className,
  isOpen,
  setIsOpen,
  withBackgroundClick = false,
}) => {
  //logic to close modal when clicking outside its content
  const handleBackgroundClick = (event) => {
    if (!withBackgroundClick) return;
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  //logic to prevent scrolling on the background content when the modal is open.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  //return null if isOpen is false
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key='modal'
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        exit={{ scale: 0, opacity: 0 }}
        className={cn(
          'fixed inset-0 z-[1000] overflow-scroll bg-neutral-900/70 px-2  py-10 dark:backdrop-blur-[1px] sm:px-5 flex items-center justify-center',
          className
        )}
        onClick={handleBackgroundClick}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
