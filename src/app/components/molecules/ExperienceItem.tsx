import React from 'react';
import { Heading } from '../atoms';
import { Experience } from '../../shared/constants/experiences';

interface ExperienceItemProps extends Experience {}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({
  company,
  role,
  dates,
  description,
  location,
}) => {
  return (
    <div className="group">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
        <div className="flex-1">
          <Heading level={3} className="text-xl font-light text-light mb-1 tracking-tight">{role}</Heading>
          <p className="text-gray-400 font-light text-lg">{company}</p>
          {location && <p className="text-gray-500 text-sm font-light mt-1">{location}</p>}
        </div>
        <span className="text-gray-500 text-sm font-light mt-1 sm:mt-0 sm:ml-4 whitespace-nowrap tracking-wide">{dates}</span>
      </div>
      <ul className="space-y-3">
        {description.map((item, index) => (
          <li key={index} className="text-gray-300 leading-relaxed font-light text-sm">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};