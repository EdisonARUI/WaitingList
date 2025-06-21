'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

/** Props for the HeroSection component */
interface HeroSectionProps {
  /** Callback function to trigger scroll to next section */
  onScrollToNext: () => void;
}

/**
 * Hero section component displaying the main value proposition.
 * Features call-to-action to scroll to the next section explaining the process.
 * @param props - The component props
 * @param props.onScrollToNext - Callback function to trigger scroll to next section
 * @returns The hero section component with value proposition and CTA
 */
export default function HeroSection({ onScrollToNext }: HeroSectionProps) {
  return (
    <section className="hero-section bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center pt-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-0">
        <div className="hero-content-grid grid md:grid-cols-2 gap-8 items-center">
          <div className="hero-text-content">
            <h1 className="hero-headline text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Own Your Dream Home with Shared Ownership
            </h1>
            
            <p className="hero-subheadline text-xl text-gray-700 mb-8 leading-relaxed">
              Start with as little as 25% ownership and gradually increase your share over time. 
              No massive down payments, no overwhelming mortgage debt.
            </p>
            
            <div className="hero-value-props space-y-4 mb-8">
              <div className="value-prop flex items-start">
                <div className="prop-icon w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                <p className="prop-text text-gray-700">
                  <strong>Lower Entry Barrier:</strong> Start homeownership with just 25% down
                </p>
              </div>
              <div className="value-prop flex items-start">
                <div className="prop-icon w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                <p className="prop-text text-gray-700">
                  <strong>Gradual Ownership Growth:</strong> Increase your share when you&apos;re ready
                </p>
              </div>
            </div>
            
            <div className="hero-cta-optional">
              <Button 
                onClick={onScrollToNext}
                className="cta-scroll-down bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Learn How It Works ↓
              </Button>
            </div>
          </div>
          
          <div className="hero-visual mb-8 relative flex items-center justify-center">
            <Image
              src="/images/hero-home.svg"
              alt="Hero-home picture"
              className="absolute w-full object-cover rounded-lg"     
            />
          </div>
        </div>
      </div>
    </section>
  );
}