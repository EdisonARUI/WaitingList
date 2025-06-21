'use client';

import { useRef } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import ExploreHomesSection from '@/components/sections/ExploreHomesSection';
import WaitingListSection from '@/components/sections/WaitingListSection';

import type { fullpageApi } from '@fullpage/react-fullpage';
/**
 * Main application page with full-screen scrolling sections.
 * Implements a single-page application using react-fullpage for smooth transitions
 * between sections: Hero, How It Works, Explore Homes, and Waiting List.
 * @returns The main page component with fullscreen scrolling functionality
 */
export default function Home() {
  /** Reference to fullpage.js API for programmatic navigation */
  const fullpageApiRef = useRef<fullpageApi | null>(null);

  /**
   * Programmatically scrolls to the next section.
   * Used by the CTA button in the Hero section.
   */
  const onScrollToNext = () => {
    if (fullpageApiRef.current) {
      fullpageApiRef.current.moveSectionDown();
    }
  };

  return (
    <div className="overflow-hidden">
      <Header />
      
      {/* Full-page scrolling implementation with custom configuration */}
      <ReactFullpage
        licenseKey="OPEN-SOURCE-GPLV3-LICENSE"
        scrollingSpeed={700}
        fitToSection={true}
        easingcss3="cubic-bezier(0.86, 0, 0.07, 1)" // Custom easing for smooth transitions
        navigation={true}
        navigationPosition="right"
        showActiveTooltip={true}
        navigationTooltips={['Home', 'How It Works', 'Explore Homes', 'Join Waiting List']}
        slidesNavigation={false}
        controlArrows={false}
        responsiveWidth={768} // Disable fullpage on mobile for better UX
        credits={{ enabled: false }}
        onLeave={(origin, destination) => {
          console.log('Leaving section', origin.index, 'to', destination.index);
        }}
        render={({ fullpageApi }) => {
          // Store API reference for programmatic navigation
          if (fullpageApi && !fullpageApiRef.current) {
            fullpageApiRef.current = fullpageApi;
          }
          
          return (
            <ReactFullpage.Wrapper>
              <div className="section">
                <HeroSection onScrollToNext={onScrollToNext} />
              </div>
              <div className="section">
                <HowItWorksSection />
              </div>
              <div className="section">
                <ExploreHomesSection />
              </div>
              <div className="section">
                <WaitingListSection />
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
}
