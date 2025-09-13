import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-6 px-4 border-t border-gray-700">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-400 hover:text-light transition-colors duration-200">
          &copy; 2025 David Santiago Vargas. All rights reserved.
        </p>
      </div>
    </footer>
  );
};