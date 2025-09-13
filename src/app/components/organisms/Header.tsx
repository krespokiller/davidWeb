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
    <header className="bg-dark/95 backdrop-blur-sm text-light py-6 px-4 border-b border-gray-700/50 sticky top-0 z-50">
      <div className="container flex justify-between items-center">
        <div className="hover:scale-105 transition-transform duration-300 cursor-pointer">
          <Heading level={1} className="text-gradient text-2xl">David Santiago Vargas</Heading>
          <p className="text-secondary mt-1 hover:text-primary transition-colors duration-200 text-sm">Software Engineer</p>
        </div>
        <nav className="hidden md:flex space-x-2">
          <button
            className="nav-link"
            onClick={() => scrollToSection('experience')}
          >
            Experience
          </button>
          <button
            className="nav-link"
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </button>
        </nav>
        {/* Mobile menu button */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};