'use client';

import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onScrollToNext: () => void;
}

export default function HeroSection({ onScrollToNext }: HeroSectionProps) {
  return (
    // Ensure the section itself takes at least the full viewport height
    // and is positioned for absolute children.
    <section className="hero-section min-h-screen flex items-center pt-20 relative overflow-hidden">
      <img
        src="/images/background.svg" 
        alt="Subtle background pattern"
        className="absolute inset-0 w-full h-full object-contain -z-10 opacity-80"
      />

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
                  <strong>Gradual Ownership Growth:</strong> Increase your share when you're ready
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
          
          <div className="hero-visual mb-8">
            <img
              src="/images/hero-home.jpg"
              alt="A modern, beautiful home with large windows and a lush garden"
              className="w-full h-80 md:h-96 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}