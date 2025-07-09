'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Card, CardContent } from '@/components/ui/card';
import PropertyModal from '@/components/PropertyModal';
import Image from 'next/image';

/** Property data structure for displaying home listings */
interface PropertyData {
  location: string;
  description: string;
  icon: string;
  gradient: string;
  images: string[];
}

/**
 * Section component displaying property cards with modal functionality.
 * Features property browsing with detailed modal views and navigation.
 * @returns The explore homes section with property grid and modal
 */
export default function ExploreHomesSection() {
  /** Modal visibility state */
  const [showModal, setShowModal] = useState(false);
  /** Currently selected property for modal display */
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(null);
  /** Index of current property for navigation */
  const [currentIndex, setCurrentIndex] = useState(0);
  /** Hydration safety flag for React Portal */
  const [mounted, setMounted] = useState(false);

  /**
   * Ensures React Portal only renders on client-side to prevent hydration mismatches.
   * This is required when using createPortal with SSR.
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  /** 
   * Property listings data with multiple images per property.
   * Each property includes location info, description, and image gallery.
   */
  const propertiesData: PropertyData[] = [
    {
      location: 'KLCC, Kuala Lumpur',
      description: 'Modern 3-bedroom townhome in growing tech hub area with excellent schools and amenities.',
      icon: '🏘️',
      gradient: 'from-blue-200 to-blue-300',
      images: ['/images/p1.png', '/images/p1-1.png', '/images/p1-2.png', '/images/p1-3.png']
    },
    {
      location: 'KLCC, Kuala Lumpur',
      description: 'Charming 2-bedroom condo with mountain views, close to downtown and outdoor recreation.',
      icon: '🏡',
      gradient: 'from-green-200 to-green-300',
      images: ['/images/p2.png', '/images/p2-1.png', '/images/p2-2.png', '/images/p2-3.png']
    },
    {
      location: 'KLCC, Kuala Lumpur',
      description: 'Spacious 4-bedroom single-family home in family-friendly neighborhood with great schools.',
      icon: '🏠',
      gradient: 'from-purple-200 to-purple-300',
      images: ['/images/p3.png', '/images/p3-1.png', '/images/p3-2.png', '/images/p3-3.png']
    },
    {
      location: 'KLCC, Kuala Lumpur',
      description: 'Contemporary 2-bedroom apartment with resort-style amenities and desert landscape views.',
      icon: '🏢',
      gradient: 'from-yellow-200 to-yellow-300',
      images: ['/images/p4.png', '/images/p4-1.png', '/images/p4-2.png', '/images/p4-3.png']
    },
    {
      location: 'TRX, Kuala Lumpur',
      description: 'Historic 3-bedroom home renovated with modern amenities in vibrant music district.',
      icon: '🏘️',
      gradient: 'from-indigo-200 to-indigo-300',
      images: ['/images/p5.png', '/images/p5-1.png', '/images/p5-2.png', '/images/p5-3.png']
    },
    {
      location: 'TRX, Kuala Lumpur',
      description: 'Beachside 2-bedroom condo with ocean access and year-round sunshine lifestyle.',
      icon: '🏡',
      gradient: 'from-pink-200 to-pink-300',
      images: ['/images/p6.png', '/images/p6-1.png', '/images/p6-2.png', '/images/p6-3.png']
    }
  ];

  /**
   * Opens the property modal with the selected property data.
   * @param property - The property data to display in the modal
   * @param index - The index of the property for navigation purposes
   */
  const openModal = (property: PropertyData, index: number) => {
    console.log('open card', property, index);
    console.log('Setting modal state: showModal=true');
    setSelectedProperty(property);
    setCurrentIndex(index);
    setShowModal(true);
  };

  /** Closes the property modal and resets selected property */
  const closeModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  /** Navigates to the next property in the list if available */
  const goToNextProperty = () => {
    if (currentIndex < propertiesData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedProperty(propertiesData[nextIndex]);
    }
  };

  /** Navigates to the previous property in the list if available */
  const goToPrevProperty = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setSelectedProperty(propertiesData[prevIndex]);
    }
  };

  console.log('Component render - showModal:', showModal, 'selectedProperty:', selectedProperty);

  return (
    <section className="explore-homes-section min-h-screen flex items-center py-16" style={{ backgroundColor: '#B3D2E0' }}>
      <div className="container mx-auto px-4">
        <div className="section-header text-center mb-12">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Future Homes
          </h2>
          <p className="section-subtitle text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the types of properties that will be available through our shared ownership program
          </p>
        </div>
        
        <div className="properties-grid grid md:grid-cols-3 gap-6 mb-8">
          {propertiesData.map((property, index) => (
            <Card 
              key={index} 
              className="property-card bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
              onClick={() => openModal(property, index)}
            >
              <div className={`property-image h-48 overflow-hidden`}>
                <Image
                  src={property.images[0]} 
                  alt={property.location + ' property'} 
                  width={300}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
                />
              </div>
              <CardContent className="property-content p-4">
                <h3 className="property-location text-lg font-semibold text-gray-900 mb-2">
                  {property.location}
                </h3>
                <p className="property-description text-gray-600 text-sm mb-3">
                  {property.description}
                </p>
                <div className="view-details text-blue-600 text-sm font-medium flex items-center">
                  <span>View Details</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Property Modal - Rendered via Portal to escape fullpage.js container */}
        {mounted && showModal && selectedProperty && createPortal(
          <>
            <PropertyModal
              property={selectedProperty}
              onClose={closeModal}
              onNext={goToNextProperty}
              onPrev={goToPrevProperty}
              isFirstProperty={currentIndex === 0}
              isLastProperty={currentIndex === propertiesData.length - 1}
            />
          </>,
          document.body
        )}
      </div>
    </section>
  );
} 