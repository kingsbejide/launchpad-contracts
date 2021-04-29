import Navigation from '../Home/components/Navigation';
import BottomBanner from '../Home/components/BottomBanner'
import PrivacyMD from './policies/privacy.md';
import PolicyPage from './common/PolicyPage';

const NEXT_PAGE =  {
  link: "/cookie",
  text: "Cookie Policy",  
}

const Privacy: React.FC = () => {
  return (
    <>
      <Navigation />
      <PolicyPage markdown={PrivacyMD} next={NEXT_PAGE} />
      <BottomBanner />
    </>
  );
};

export default Privacy;
