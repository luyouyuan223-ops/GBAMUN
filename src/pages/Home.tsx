import React from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Hero />
      <Projects />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
