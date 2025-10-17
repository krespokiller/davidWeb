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

export const WithLanguageToggle: Story = {
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div style={{ height: '200px', background: '#1a1a1a', padding: '20px', color: 'white' }}>
          Language Toggle Demo - Click the button in the top-right to switch between ES/EN
        </div>
      </div>
    ),
  ],
};