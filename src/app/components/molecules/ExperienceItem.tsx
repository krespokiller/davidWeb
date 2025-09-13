import React from 'react';
import { Heading } from '../atoms';
import { Experience } from '../../shared/constants/experiences';

interface ExperienceItemProps extends Experience {
  showFull?: boolean;
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({
  company,
  role,
  dates,
  description,
  location,
  showFull = false,
}) => {
  return (
    <div className="card group h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
        <div className="flex-1 min-w-0">
          <Heading level={3} className="text-lg font-light text-light mb-1 tracking-tight line-clamp-2">{role}</Heading>
          <p className="text-gray-400 font-light text-base line-clamp-1">{company}</p>
          {location && <p className="text-gray-500 text-sm font-light mt-1 line-clamp-1">{location}</p>}
        </div>
        <span className="text-gray-500 text-xs font-light mt-1 sm:mt-0 sm:ml-4 whitespace-nowrap tracking-wide shrink-0">{dates}</span>
      </div>
      <div className="flex-1 overflow-hidden">
        <ul className="space-y-2">
          {(showFull ? description : description.slice(0, 2)).map((item, index) => (
            <li key={index} className="text-gray-300 leading-relaxed font-light text-sm">
              {item}
            </li>
          ))}
          {!showFull && description.length > 2 && (
            <li className="text-gray-500 text-xs font-light">
              +{description.length - 2} más...
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};