import React from 'react';
import { Heading } from '../atoms';
import { ExperienceItem } from '../molecules';
import { experiences } from '../../shared/constants/experiences';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <Heading level={2} className="text-3xl md:text-4xl font-light text-light text-center mb-16 tracking-tight">
            Experience
          </Heading>
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="border-b border-gray-800/50 pb-12 last:border-b-0"
              >
                <ExperienceItem
                  company={exp.company}
                  role={exp.role}
                  dates={exp.dates}
                  location={exp.location}
                  description={exp.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};