import type { Meta, StoryObj } from '@storybook/react';
import { ContactForm } from './ContactForm';

const meta: Meta<typeof ContactForm> = {
  title: 'Molecules/ContactForm',
  component: ContactForm,
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const InCard: Story = {
  decorators: [
    (Story) => (
      <div className="card p-6 max-w-md">
        <Story />
      </div>
    ),
  ],
};