import SiteBackground from './components/SiteBackground';
import SectionDivider from './components/SectionDivider';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Metrics from './sections/Metrics';
import Problem from './sections/Problem';
import Solution from './sections/Solution';
import HowItWorks from './sections/HowItWorks';
import Capabilities from './sections/Capabilities';
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
      <Demo />
      <SectionDivider />
      <Metrics />
      <SectionDivider />
      {/* Where QA Gets Stuck — kept in code, hidden from the page for now. */}
      {/* <Problem /> */}
      {/* <SectionDivider /> */}
      <Solution />
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <Capabilities />
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
