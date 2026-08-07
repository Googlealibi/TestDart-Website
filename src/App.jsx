import SiteBackground from './components/SiteBackground';
import SectionDivider from './components/SectionDivider';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import HowItWorks from './sections/HowItWorks';
import AIGeneration from './sections/AIGeneration';
import AIExecution from './sections/AIExecution';
import Demo from './sections/Demo';
import Features from './sections/Features';
import Pricing from './sections/Pricing';
import FAQ from './sections/FAQ';
import FinalCta from './sections/FinalCta';
import Footer from './sections/Footer';

function App() {
  return (
    <>
      <SiteBackground />
      <Navbar />
      <Hero />
      <SectionDivider />
      <Problem />
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <AIGeneration />
      <SectionDivider />
      <AIExecution />
      <SectionDivider />
      <Demo />
      <SectionDivider />
      <Features />
      <SectionDivider />
      <Pricing />
      <SectionDivider />
      <FAQ />
      <FinalCta />
      <Footer />
    </>
  );
}

export default App;
