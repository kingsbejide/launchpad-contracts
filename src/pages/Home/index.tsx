import BannerSection from './components/BannerSection';
import HowItWorksSection from './components/HowItWorksSection';
import WhatToExpectSection from './components/WhatToExpectSection';
import HelpProjects from './components/HelpProjects';
import Projects from './components/Projects';
import VisionSection from './components/VisionSection';
import RoadMapSection from './components/RoadMapSection/';
import SocialMediaSection from './components/SocialMediaSection';
import BottomBanner from './components/BottomBanner';
import PartnersInvestorsSection from './components/PartnersInvestorsSection';

const Home: React.FC = () => {
  return (
    <>
      <BannerSection />
      <HowItWorksSection />
      <WhatToExpectSection />
      <VisionSection />
      <HelpProjects />
      <RoadMapSection />
      <Projects />
      <PartnersInvestorsSection />
      <SocialMediaSection />
      <BottomBanner />
    </>
  );
};

export default Home;
