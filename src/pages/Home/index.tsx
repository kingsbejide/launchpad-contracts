import BannerSection from './components/BannerSection';
import HowItWorksSection from './components/HowItWorksSection';
import WhatToExpectSection from './components/WhatToExpectSection';
import VisionSection from './components/VisionSection';
import RoadMapSection from './components/RoadMapSection';
import SocialMediaSection from './components/SocialMediaSection';
import BottomBanner from './components/BottomBanner'

const Home: React.FC = () => {
  return (
    <>
      <BannerSection />
      <HowItWorksSection />
      <WhatToExpectSection />
      <VisionSection />
      <RoadMapSection />
      <SocialMediaSection />
      <BottomBanner />
    </>
  );
};

export default Home;
