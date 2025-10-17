import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading } from '@/components/atoms';
import { Experience } from '@/models';

interface ExperienceItemProps extends Experience {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({
  company,
  role,
  dates,
  description,
  location,
  isExpanded = false,
  onToggleExpand,
}) => {
  const { t } = useTranslation();
  const maxItemsToShow = 3;
  const shouldShowExpandButton = description.length > maxItemsToShow;
  const displayedDescription = isExpanded ? description : description.slice(0, maxItemsToShow);

  const handleToggleExpand = () => {
    if (onToggleExpand) {
      onToggleExpand();
    }
  };

  return (
    <div className={`card group h-full flex flex-col transition-all duration-500 ease-out ${
      isExpanded
        ? 'bg-gray-900/90 shadow-2xl border-gray-600/50'
        : 'hover:shadow-xl hover:bg-gray-900/60'
    }`}>
      {/* Header Section - Fixed at top */}
      <div className={`flex flex-col ${isExpanded ? 'md:flex-row md:items-start md:gap-6' : 'sm:flex-row sm:justify-between sm:items-start'} mb-6 transition-all duration-700`}>
        <div className="flex-1 min-w-0">
          <Heading level={3} className={`font-light text-light mb-2 tracking-tight transition-all duration-700 ${
            isExpanded ? 'text-2xl md:text-3xl' : 'text-lg group-hover:text-xl'
          }`}>
            {role}
          </Heading>
          <p className={`text-gray-400 font-light transition-all duration-700 ${isExpanded ? 'text-lg' : 'text-base'}`}>
            {company}
          </p>
          {location && (
            <p className={`text-gray-500 font-light mt-1 transition-all duration-700 ${isExpanded ? 'text-base' : 'text-sm'}`}>
              {location}
            </p>
          )}
        </div>
        <span className={`text-gray-500 font-light whitespace-nowrap tracking-wide shrink-0 transition-all duration-700 ${
          isExpanded
            ? 'mt-3 md:mt-0 text-sm bg-gray-800/50 px-3 py-1 rounded-full'
            : 'text-xs mt-1 sm:mt-0 sm:ml-4'
        }`}>
          {dates}
        </span>
      </div>

      {/* Content Section - Takes available space */}
      <div className="flex-1 flex flex-col justify-between min-h-0">
        <ul className={`space-y-3 ${isExpanded ? 'space-y-4' : ''} flex-1`}>
          {displayedDescription.map((item: string, index: number) => (
            <li key={index} className={`text-gray-300 leading-relaxed font-light transition-all duration-700 ${
              isExpanded ? 'text-base' : 'text-sm'
            }`}>
              {item}
            </li>
          ))}
        </ul>

        {/* Button Section - Always at bottom */}
        {shouldShowExpandButton && (
          <div className="mt-6 pt-4 border-t border-gray-700/50 flex-shrink-0">
            <button
              onClick={handleToggleExpand}
              className="text-primary hover:text-secondary transition-all duration-300 text-sm font-medium hover:underline px-3 py-2 rounded-lg hover:bg-gray-800/50"
            >
              {isExpanded ? t('experience.showLess') : t('experience.showMore', { count: description.length - maxItemsToShow })}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};