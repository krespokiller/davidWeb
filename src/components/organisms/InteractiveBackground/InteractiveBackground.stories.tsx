import type { Meta, StoryObj } from '@storybook/react';
import { InteractiveBackground } from './InteractiveBackground';

const meta: Meta<typeof InteractiveBackground> = {
  title: 'Organisms/InteractiveBackground',
  component: InteractiveBackground,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Interactive background component with gravitational deformation effect. Features a network of nodes and lines that respond to mouse/touch movement with subtle gravitational attraction.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InteractiveBackground>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default interactive background with gravitational deformation. Move your mouse over the canvas to see the effect.',
      },
    },
  },
};

export const WithContent: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="relative min-h-screen bg-dark">
        <Story />
        <div className="relative z-10 p-8">
          <h1 className="text-4xl font-bold text-light mb-4">Interactive Background Demo</h1>
          <p className="text-gray-400 mb-4">
            Move your mouse around to see the gravitational deformation effect.
            The background nodes and lines will subtly warp toward your cursor position.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-light font-semibold mb-2">Feature 1</h3>
              <p className="text-gray-400 text-sm">Content that appears above the interactive background.</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-light font-semibold mb-2">Feature 2</h3>
              <p className="text-gray-400 text-sm">The background effect is completely non-intrusive.</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-light font-semibold mb-2">Feature 3</h3>
              <p className="text-gray-400 text-sm">Smooth performance with optimized rendering.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Interactive background with overlay content to demonstrate z-index layering and content interaction.',
      },
    },
  },
};

export const MobileFriendly: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile-optimized version with touch support. Touch and drag to see the gravitational effect.',
      },
    },
  },
};

export const PerformanceOptimized: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Performance-optimized version running at 30fps with selective rendering. Only renders elements within proximity of the cursor.',
      },
    },
  },
};