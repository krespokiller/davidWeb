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
    <header className="bg-dark text-light py-6 px-4 border-b border-gray-700">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="hover:scale-105 transition-transform duration-300">
          <Heading level={1} className="text-gradient">David Santiago Vargas</Heading>
          <p className="text-secondary mt-2 hover:text-primary transition-colors duration-200">Software Engineer</p>
        </div>
        <nav className="hidden md:flex space-x-6">
          <button
            className="nav-link px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300"
            onClick={() => scrollToSection('experience')}
          >
            Experience
          </button>
          <button
            className="nav-link px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300"
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
};