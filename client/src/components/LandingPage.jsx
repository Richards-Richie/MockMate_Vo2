import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import TestimonialsSection from './TestimonialsSection';
import CTASection from './CTASection';
import Footer from './Footer';

function LandingPage() {
  return (
    <div className="min-vh-100">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection /> 
      {/* <TestimonialsSection /> */}
      {/* <CTASection /> */}
      <Footer />
    </div>
  );
}

export default LandingPage;