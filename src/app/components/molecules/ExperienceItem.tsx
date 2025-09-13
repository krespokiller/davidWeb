import React from 'react';
import { Heading } from '../atoms';

interface ExperienceItemProps {
  company: string;
  role: string;
  dates: string;
  description: string[];
  location?: string;
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({
  company,
  role,
  dates,
  description,
  location,
}) => {
  return (
    <div className="card p-6 mb-6">
      <div className="flex justify-between items-start mb-2">
        <Heading level={3} className="text-gradient">{role}</Heading>
        <span className="text-sm text-gray-400">{dates}</span>
      </div>
      <p className="text-secondary font-semibold mb-2">{company}{location && ` – ${location}`}</p>
      <ul className="list-disc list-inside text-gray-300 space-y-1">
        {description.map((item, index) => (
          <li key={index} className="hover:text-light transition-colors duration-200">{item}</li>
        ))}
      </ul>
    </div>
  );
};