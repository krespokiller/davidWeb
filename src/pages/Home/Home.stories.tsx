import type { Meta, StoryObj } from '@storybook/react';
import { Home } from './Home';

const meta: Meta<typeof Home> = {
  title: 'Pages/Home',
  component: Home,
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

export const FullPortfolioView: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000, background: 'rgba(0,0,0,0.8)', padding: '12px', borderRadius: '8px', color: 'white', fontSize: '14px', maxWidth: '200px' }}>
          <div style={{ fontSize: '16px', marginBottom: '5px' }}>🌐</div>
          <div>Use the language toggle button in the top-right corner of the header to switch between English and Spanish.</div>
        </div>
        <Story />
      </div>
    ),
  ],
};