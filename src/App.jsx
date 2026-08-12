import SiteBackground from './components/SiteBackground';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Metrics from './sections/Metrics';
// import Problem from './sections/Problem'; // "Where QA Gets Stuck" — hidden from the page, keep code for later
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
      <Demo />
      <Metrics />
      {/* <Problem /> */}
      <Solution />
      <Features />
      <HowItWorks />
      <Capabilities />
      <Pricing />
      <FAQ />
      <FinalCta />
      <Footer />
    </>
  );
}

export default App;
