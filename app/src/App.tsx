import { useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import CustomCursor from './components/CustomCursor';
import Navbar from './sections/Navbar';
import HeroSection from './sections/HeroSection';
import BentoGrid from './sections/BentoGrid';
import PortfolioGallery from './sections/PortfolioGallery';
import Footer from './sections/Footer';

function App() {
  useLenis();

  useEffect(() => {
    // Preload fonts
    document.fonts.ready.then(() => {
      document.documentElement.classList.add('fonts-loaded');
    });
  }, []);

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#FFF0F5' }}>
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <BentoGrid />
        <PortfolioGallery />
        <Footer />
      </main>
    </div>
  );
}

export default App;
