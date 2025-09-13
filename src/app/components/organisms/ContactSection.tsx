import React from 'react';
import { Heading, Button } from '../atoms';
import { ContactForm } from '../molecules';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-12 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <Heading level={2} className="mb-8 text-gradient">Get In Touch</Heading>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-gray-300 mb-6 leading-relaxed">
              I'm always interested in new opportunities and collaborations.
              Feel free to reach out if you'd like to work together or just say hello!
            </p>
            <div className="space-y-4">
              <p className="text-gray-300 hover:text-light transition-colors duration-200">
                <strong className="text-primary">Email:</strong> davidsantiagovargas1234@gmail.com
              </p>
              <p className="text-gray-300 hover:text-light transition-colors duration-200">
                <strong className="text-primary">Location:</strong> Bogotá, Colombia
              </p>
              <div className="flex space-x-4">
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
          <ContactForm />
        </div>
      </div>
    </section>
  );
};