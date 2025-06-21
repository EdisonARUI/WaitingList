'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

/** Property data structure for modal display */
interface PropertyData {
  location: string;
  description: string;
  icon: string;
  gradient: string;
  images: string[];
}

/** Props for the PropertyModal component */
interface PropertyModalProps {
  /** Property data to display in the modal */
  property: PropertyData;
  /** Callback to close the modal */
  onClose: () => void;
  /** Callback to navigate to next property */
  onNext: () => void;
  /** Callback to navigate to previous property */
  onPrev: () => void;
  /** Whether this is the first property (disables prev navigation) */
  isFirstProperty: boolean;
  /** Whether this is the last property (disables next navigation) */
  isLastProperty: boolean;
}

/**
 * Full-screen modal component for displaying property details with image gallery.
 * Features keyboard navigation, image thumbnails, and property navigation.
 * Rendered via React Portal to escape parent container constraints.
 * @param props - The component props
 * @param props.property - Property data to display in the modal
 * @param props.onClose - Callback to close the modal
 * @param props.onNext - Callback to navigate to next property
 * @param props.onPrev - Callback to navigate to previous property
 * @param props.isFirstProperty - Whether this is the first property (disables prev navigation)
 * @param props.isLastProperty - Whether this is the last property (disables next navigation)
 * @returns The modal component rendered via React Portal
 */
export default function PropertyModal({ 
  property, 
  onClose, 
  onNext, 
  onPrev, 
  isFirstProperty, 
  isLastProperty 
}: PropertyModalProps) {
  /** Currently selected image index in the gallery */
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  /** Hydration safety flag for React Portal */
  const [mounted, setMounted] = useState(false);

  /**
   * Ensures component only renders on client-side to prevent hydration issues.
   * Required when using createPortal with SSR.
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Sets up keyboard navigation for modal interactions.
   * Escape closes modal, arrow keys navigate between properties.
   */
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && !isFirstProperty) {
        onPrev();
      } else if (e.key === 'ArrowRight' && !isLastProperty) {
        onNext();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onClose, onNext, onPrev, isFirstProperty, isLastProperty]);

  /** Resets image gallery to first image when property changes */
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [property]);

  /**
   * Handles thumbnail click to change main image display.
   * @param index - Index of the image to display
   */
  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  /**
   * Closes modal when clicking on backdrop (outside modal content).
   * @param e - Mouse event from backdrop click
   */
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  /**
   * Prevents modal close when clicking inside modal content.
   * @param e - Mouse event from modal content
   */
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Prevent SSR rendering issues
  if (!mounted) return null;

  const modalContent = (
    <div 
      className="property-modal-overlay fixed inset-0 z-[9999] bg-black bg-opacity-70 backdrop-blur-md flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Navigation Arrows */}
      {!isFirstProperty && (
        <Button
          onClick={onPrev}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 z-[10000] bg-white hover:bg-gray-100 text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200"
          aria-label="Previous property"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>
      )}

      {!isLastProperty && (
        <Button
          onClick={onNext}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 z-[10000] bg-white hover:bg-gray-100 text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200"
          aria-label="Next property"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      )}

      {/* Modal Content */}
      <div 
        className="property-modal-content bg-white rounded-lg shadow-2xl w-[80vw] h-[80vh] flex flex-col overflow-hidden transition-opacity duration-300 ease-in-out opacity-100"
        onClick={handleModalContentClick}
      >
        {/* Close Button */}
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-2 shadow-md"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>

        {/* Top 3/4 - Images Area */}
        <div className="h-3/4 flex overflow-hidden">
          {/* Main Image - 3/4 of image area */}
          <div className="w-3/4 relative bg-gray-100">
            <Image
              src={property.images[selectedImageIndex]}
              alt={`${property.location} - Image ${selectedImageIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Thumbnail Images - 1/4 of image area */}
          <div className="w-1/4 flex flex-col gap-2 p-2">
            {property.images.map((image, index) => (
              <div 
                key={index}
                className={`relative h-1/4 cursor-pointer rounded-md overflow-hidden transition-all duration-200 ${
                  selectedImageIndex === index 
                    ? 'ring-2 ring-blue-500 ring-offset-2' 
                    : 'hover:ring-1 hover:ring-gray-300'
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  src={image}
                  alt={`${property.location} - Thumbnail ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                {selectedImageIndex === index && (
                  <div className="absolute inset-0 bg-blue-500 bg-opacity-20"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom 1/4 - Property Info */}
        <div className="h-1/4 p-6 border-t border-gray-200 flex flex-col justify-center bg-gray-50">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {property.location}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {property.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  /** Render modal via Portal to bypass fullpage.js container restrictions */
  return createPortal(modalContent, document.body);
} 