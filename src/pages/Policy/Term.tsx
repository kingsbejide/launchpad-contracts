import Navigation from '../Home/components/Navigation';
import BottomBanner from '../Home/components/BottomBanner'
import TermMD from './policies/term.md';
import PolicyPage from './common/PolicyPage';

const Privacy: React.FC = () => {
  return (
    <>
      <Navigation showNavBackground />
      <PolicyPage markdown={TermMD} />
      <BottomBanner />
    </>
  );
};

export default Privacy;
