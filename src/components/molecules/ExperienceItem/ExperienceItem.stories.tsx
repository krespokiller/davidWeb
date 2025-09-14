import type { Meta, StoryObj } from '@storybook/react';
import { ExperienceItem } from './ExperienceItem';

const meta: Meta<typeof ExperienceItem> = {
  title: 'Molecules/ExperienceItem',
  component: ExperienceItem,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0C2604' },
        { name: 'light', value: '#F2F2F2' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    company: {
      control: { type: 'text' },
    },
    role: {
      control: { type: 'text' },
    },
    dates: {
      control: { type: 'text' },
    },
    location: {
      control: { type: 'text' },
    },
    description: {
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    company: 'Galgo',
    role: 'Software Engineer',
    dates: 'Dec 2023 – Sep 2025',
    location: 'Remote',
    description: [
      'Checkout Team: Developed and maintained features in a Backend for Frontend (BFF) architecture using NestJS and Next.js',
      'Risk Team: Maintained and supported multiple applications within a microservices ecosystem',
      'Worked with Taktile and Retool to improve decision-making processes',
    ],
  },
};

export const CurrentPosition: Story = {
  args: {
    company: 'Trebet',
    role: 'Founder / Software Engineer',
    dates: 'Sep 2024 – Present',
    location: 'Bogotá, Colombia',
    description: [
      'Developing and maintaining a mobile application using React Native',
      'Managing and supporting the server infrastructure',
      'Ensuring reliable operation of backend services and mobile app',
    ],
  },
};

export const Freelance: Story = {
  args: {
    company: 'Freelance',
    role: 'Web Developer',
    dates: '2020',
    location: 'Remote',
    description: [
      'Designed and developed a landing page for a truck workshop',
      'Integrated WhatsApp chat button for customer support',
      'Built an online clothing store with PrestaShop',
    ],
  },
};