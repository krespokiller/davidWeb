import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
  title: 'Atoms/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
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
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
    },
    children: {
      control: { type: 'text' },
    },
    className: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    level: 1,
    children: 'Main Heading H1',
  },
};

export const H2: Story = {
  args: {
    level: 2,
    children: 'Section Heading H2',
  },
};

export const H3: Story = {
  args: {
    level: 3,
    children: 'Subsection Heading H3',
  },
};

export const H4: Story = {
  args: {
    level: 4,
    children: 'Smaller Heading H4',
  },
};

export const H5: Story = {
  args: {
    level: 5,
    children: 'Even Smaller H5',
  },
};

export const H6: Story = {
  args: {
    level: 6,
    children: 'Smallest Heading H6',
  },
};

export const WithCustomClass: Story = {
  args: {
    level: 2,
    children: 'Heading with Custom Class',
    className: 'text-accent',
  },
};