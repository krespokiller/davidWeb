import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
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

export const WithScrollTarget: Story = {
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div id="experience" style={{ height: '500px', background: '#1a1a1a', padding: '20px' }}>
          Experience Section
        </div>
        <div id="contact" style={{ height: '500px', background: '#2a2a2a', padding: '20px' }}>
          Contact Section
        </div>
      </div>
    ),
  ],
};