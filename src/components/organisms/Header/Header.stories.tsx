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

export const TransparentWithLanguageToggle: Story = {
  decorators: [
    (Story) => (
      <div style={{ background: '#0C2604', minHeight: '100vh', position: 'relative' }}>
        <Story />
        <div style={{ height: '400px', background: '#1a1a1a', padding: '20px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h3>Header Component Demo</h3>
            <p>The header is transparent and positioned at the top.</p>
            <p>Look for the language toggle button (🌐 ES/EN) in the top-right corner.</p>
            <p>Click it to switch between English and Spanish.</p>
          </div>
        </div>
      </div>
    ),
  ],
};