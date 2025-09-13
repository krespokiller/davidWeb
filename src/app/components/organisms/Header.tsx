import React from 'react';
import { Heading, Button } from '../atoms';

export const Header: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="container flex justify-between items-center py-6">
        <div className="cursor-pointer group">
          <Heading level={1} className="text-xl font-light text-light tracking-wide group-hover:text-primary transition-colors duration-300">
            David Santiago Vargas
          </Heading>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <button
            className="text-gray-400 hover:text-light transition-colors duration-300 font-light tracking-wide text-sm"
            onClick={() => scrollToSection('experience')}
          >
            Experience
          </button>
          <button
            className="text-gray-400 hover:text-light transition-colors duration-300 font-light tracking-wide text-sm"
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </button>
        </nav>
        {/* Mobile menu button */}
        <button className="md:hidden p-2 rounded-full hover:bg-gray-800/50 transition-colors duration-300">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};