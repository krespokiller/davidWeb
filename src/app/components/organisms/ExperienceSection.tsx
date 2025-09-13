import React from 'react';
import { Heading } from '../atoms';
import { ExperienceItem } from '../molecules';

const experiences = [
  {
    company: 'Galgo',
    role: 'Software Engineer',
    dates: 'Dec 2023 – Sep 2025',
    location: 'Remote',
    description: [
      'Checkout Team: Developed and maintained features in a Backend for Frontend (BFF) architecture using NestJS and Next.js, with a stronger focus on backend development in NestJS.',
      'Risk Team: Maintained and supported multiple applications within a microservices ecosystem built on an event-driven architecture in AWS.',
      'Worked with Taktile (decision-flow platform) and Retool (internal UI builder) to improve decision-making processes and internal operations.',
      'Implemented monitoring and analytics solutions with Datadog and Amplitude to ensure system reliability and provide product insights.',
      'Acted as a technical bridge, supporting both engineering teams and business executives in troubleshooting and solving operational issues.',
    ],
  },
  {
    company: 'Trebet',
    role: 'Founder / Software Engineer',
    dates: 'Sep 2024 – Present',
    location: 'Bogotá, Colombia',
    description: [
      'Developing and maintaining a mobile application using React Native.',
      'Managing and supporting the server infrastructure that powers an intercom system.',
      'Ensuring reliable operation of both backend services and mobile app functionality.',
    ],
  },
  {
    company: 'Loopay',
    role: 'Full Stack Developer',
    dates: 'Jan 2023 – 2024',
    location: 'Remote',
    description: [
      'Improved and extended an existing application built with RedwoodJS.',
      'Developed features using GraphQL, Prisma, Node.js, and React.',
      'Optimized database interactions with Prisma and handled backend logic with Node.js.',
      'Built responsive and user-friendly interfaces with React.',
    ],
  },
  {
    company: 'Tribuu Technologies',
    role: 'Full Stack Developer',
    dates: '2021 – 2022',
    location: 'Remote',
    description: [
      'Led the development of a Single Page Application (SPA) with Angular, Express, and MongoDB.',
      'Designed and implemented a microservices architecture to improve scalability and modularity.',
      'Integrated Algolia for advanced search and improved content discoverability.',
      'Embedded video conferencing capabilities by integrating Zoom APIs.',
    ],
  },
  {
    company: 'Freelance',
    role: 'Web Developer',
    dates: '2020',
    location: 'Remote',
    description: [
      'Designed and developed a landing page for a truck workshop using HTML, CSS, and vanilla JavaScript.',
      'Integrated a WhatsApp chat button for customer support.',
      'Built an online clothing store with PrestaShop, increasing visibility and enabling online sales.',
    ],
  },
  {
    company: 'Freelance',
    role: 'CMS Developer',
    dates: '2018 – 2019',
    location: 'Remote',
    description: [
      'Developed a discreet e-commerce platform using WordPress and WooCommerce.',
      'Implemented responsive design and security measures for a confidential online retail experience.',
    ],
  },
];

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="section animate-slide-up">
      <div className="container">
        <Heading level={2} className="mb-12 text-gradient text-center text-3xl md:text-4xl">Professional Experience</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
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
    </section>
  );
};