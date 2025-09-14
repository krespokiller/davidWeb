import type { Meta, StoryObj } from '@storybook/react';
import { ExperienceSection } from './ExperienceSection';

const meta: Meta<typeof ExperienceSection> = {
  title: 'Organisms/ExperienceSection',
  component: ExperienceSection,
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
        <div style={{ height: '100px', background: '#0C2604', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          Header Section
        </div>
        <Story />
        <div style={{ height: '100px', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          Contact Section
        </div>
      </div>
    ),
  ],
};