import type { Meta, StoryObj } from '@storybook/react';
import { ExperienceSection } from './ExperienceSection';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';

const meta: Meta<typeof ExperienceSection> = {
  title: 'Organisms/ExperienceSection',
  component: ExperienceSection,
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    ),
  ],
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

export const WithExpandableCards: Story = {
  decorators: [
    (Story) => (
      <div style={{ background: '#0C2604', minHeight: '100vh', padding: '20px' }}>
        <div style={{ height: '80px', background: '#0C2604', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '20px', borderBottom: '1px solid #333' }}>
          <h2 style={{ margin: 0 }}>Experience Section</h2>
        </div>
        <Story />
        <div style={{ marginTop: '20px', padding: '15px', background: '#1a1a1a', borderRadius: '5px', color: 'white' }}>
          <p><strong>Instructions:</strong> Click on any experience card to expand and see detailed information. Only one card can be expanded at a time.</p>
        </div>
      </div>
    ),
  ],
};