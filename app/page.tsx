'use client';

import { useRef } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import ExploreHomesSection from '@/components/sections/ExploreHomesSection';
import WaitingListSection from '@/components/sections/WaitingListSection';

export default function Home() {
  const fullpageApiRef = useRef<any>(null);

  const onScrollToNext = () => {
    if (fullpageApiRef.current) {
      fullpageApiRef.current.moveSectionDown();
    }
  };

  return (
    <div className="overflow-hidden">
      <Header />
      
      <ReactFullpage
        licenseKey="OPEN-SOURCE-GPLV3-LICENSE"
        scrollingSpeed={700}
        fitToSection={true}
        easingcss3="cubic-bezier(0.86, 0, 0.07, 1)"
        navigation={true}
        navigationPosition="right"
        showActiveTooltip={true}
        navigationTooltips={['Home', 'How It Works', 'Explore Homes', 'Join Waiting List']}
        slidesNavigation={false}
        controlArrows={false}
        responsiveWidth={768}
        credits={{ enabled: false }}
        onLeave={(origin, destination, direction) => {
          console.log('Leaving section', origin.index, 'to', destination.index);
        }}
        render={({ state, fullpageApi }) => {
          // Store the fullpageApi reference
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
