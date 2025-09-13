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
    <div className="card group cursor-pointer">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
        <div className="flex-1">
          <Heading level={3} className="text-gradient text-xl mb-2 group-hover:scale-105 transition-transform duration-300">{role}</Heading>
          <p className="text-secondary font-semibold text-lg">{company}</p>
          {location && <p className="text-gray-400 text-sm mt-1">{location}</p>}
        </div>
        <span className="text-sm text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full mt-2 sm:mt-0 sm:ml-4 whitespace-nowrap">{dates}</span>
      </div>
      <ul className="space-y-2">
        {description.map((item, index) => (
          <li key={index} className="text-gray-300 leading-relaxed flex items-start">
            <span className="text-primary mr-2 mt-1 flex-shrink-0">•</span>
            <span className="hover:text-light transition-colors duration-200">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};