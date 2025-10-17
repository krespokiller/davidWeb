import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heading, Button } from '@/components/atoms';
import { ExperienceItem } from '@/components/molecules';
import { Experience } from '@/models';

export const ExperienceSection: React.FC = () => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const initialDisplayCount = 2;

  const experiences = t('experiences', { returnObjects: true }) as Experience[];
  const displayedExperiences = showAll ? experiences : experiences.slice(0, initialDisplayCount);

  return (
    <section id="experience" className="py-24 px-6 md:px-4">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          <Heading level={2} className="text-3xl md:text-4xl font-light text-light text-center mb-16 tracking-tight">
            {t('experience.title')}
          </Heading>

          {/* Responsive Layout with expansion support */}
          {displayedExperiences.length === 2 ? (
            // Centered layout for 2 items with proper expansion
            <div className="flex flex-col gap-6 mb-12 md:max-w-5xl md:mx-auto">
              {displayedExperiences.map((exp, index) => {
                const isExpanded = expandedCard === index;
                const otherCardExpanded = expandedCard !== null && expandedCard !== index;

                // If another card is expanded, hide this one
                if (otherCardExpanded) return null;

                return (
                  <div
                    key={index}
                    className={`transition-all duration-700 ease-in-out ${
                      isExpanded
                        ? 'md:w-full md:max-w-none' // Take full width when expanded
                        : 'md:w-full md:max-w-2xl md:mx-auto' // Centered when not expanded
                    }`}
                  >
                    <ExperienceItem
                      company={exp.company}
                      role={exp.role}
                      dates={exp.dates}
                      location={exp.location}
                      description={exp.description}
                      isExpanded={isExpanded}
                      onToggleExpand={() => setExpandedCard(isExpanded ? null : index)}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            // Grid layout for 3+ items
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
              {displayedExperiences.map((exp, index) => {
                const isExpanded = expandedCard === index;
                return (
                  <div
                    key={index}
                    className={`transition-all duration-500 ease-out ${
                      isExpanded ? 'md:col-span-2 lg:col-span-3' : ''
                    }`}
                  >
                    <ExperienceItem
                      company={exp.company}
                      role={exp.role}
                      dates={exp.dates}
                      location={exp.location}
                      description={exp.description}
                      isExpanded={isExpanded}
                      onToggleExpand={() => setExpandedCard(isExpanded ? null : index)}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* Show More Button */}
          {experiences.length > initialDisplayCount && (
            <div className="text-center mt-8">
              <div className="inline-block">
                <Button
                  onClick={() => setShowAll(!showAll)}
                  variant="secondary"
                >
                  {showAll ? t('experience.showLess') : `${t('experience.showAll')} (${experiences.length})`}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};