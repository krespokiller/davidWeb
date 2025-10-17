import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Organisms/Footer',
  component: Footer,
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

export const AtBottomOfPage: Story = {
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, background: '#0C2604', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Main Content Area</h2>
            <p>This represents the main portfolio content above the footer.</p>
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
};