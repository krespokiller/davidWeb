import React from 'react';
import { Heading, Button } from '../atoms';
import { ContactForm } from '../molecules';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="section animate-slide-up">
      <div className="container">
        <Heading level={2} className="mb-12 text-gradient text-center text-3xl md:text-4xl">Get In Touch</Heading>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 animate-fade-in">
            <p className="text-gray-300 text-lg leading-relaxed">
              I'm always interested in new opportunities and collaborations.
              Feel free to reach out if you'd like to work together or just say hello!
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-2xl hover:bg-gray-800/70 transition-colors duration-300">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-light hover:text-primary transition-colors duration-200 cursor-pointer">davidsantiagovargas1234@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-2xl hover:bg-gray-800/70 transition-colors duration-300">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-light">Bogotá, Colombia</p>
                </div>
              </div>
              <div className="flex space-x-4 pt-4">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => window.open('https://github.com/davidsantiagovargas1234', '_blank')}
                >
                  GitHub
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => window.open('https://linkedin.com/in/david-santiago-vargas', '_blank')}
                >
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};