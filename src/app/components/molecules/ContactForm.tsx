import React, { useState } from 'react';
import { Input, Button, Heading } from '../atoms';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', { name, email, message });
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="card">
      <Heading level={3} className="mb-6 text-gradient text-center">Send a Message</Heading>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Name</label>
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Email</label>
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Message</label>
          <textarea
            placeholder="Tell me about your project..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 resize-none text-light placeholder-gray-400 hover:bg-gray-800/70"
            rows={5}
            required
          />
        </div>
        <div className="pt-2">
          <Button type="submit" variant="primary">Send Message</Button>
        </div>
      </form>
    </div>
  );
};