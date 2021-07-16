import Navigation from '../Home/components/Navigation';
import BottomBanner from '../Home/components/BottomBanner'
import CookieMD from './policies/cookie.md';
import PolicyPage from './common/PolicyPage';

const PREV_PAGE =  {
  link: "/privacy",
  text: "Personal Data and Privacy Policies",  
}

const Privacy: React.FC = () => {
  return (
    <>
      <Navigation showNavBackground />
      <PolicyPage markdown={CookieMD} previous={PREV_PAGE} />
      <BottomBanner />
    </>
  );
};

export default Privacy;
