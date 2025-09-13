import React, { useState } from 'react';
import { Heading, Button } from '../atoms';
import { ExperienceItem } from '../molecules';
import { experiences } from '../../shared/constants/experiences';

export const ExperienceSection: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 3;
  const displayedExperiences = showAll ? experiences : experiences.slice(0, initialDisplayCount);

  return (
    <section id="experience" className="py-24 px-6 md:px-4">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          <Heading level={2} className="text-3xl md:text-4xl font-light text-light text-center mb-16 tracking-tight">
            Experience
          </Heading>

          {/* Improved Responsive Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-12">
            {displayedExperiences.map((exp, index) => (
              <div
                key={index}
                className={showAll ? "" : "max-h-80 overflow-hidden"}
              >
                <ExperienceItem
                  company={exp.company}
                  role={exp.role}
                  dates={exp.dates}
                  location={exp.location}
                  description={exp.description}
                  showFull={showAll}
                />
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {experiences.length > initialDisplayCount && (
            <div className="text-center">
              <Button
                onClick={() => setShowAll(!showAll)}
                variant="secondary"
              >
                {showAll ? 'Ver Menos' : `Ver Más (${experiences.length - initialDisplayCount})`}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};