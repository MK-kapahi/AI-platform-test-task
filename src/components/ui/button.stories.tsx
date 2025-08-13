import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and responsive design support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    asChild: {
      control: 'boolean',
      description: 'Whether to render as a child element',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
}

export const Link: Story = {
  args: {
    children: 'Link',
    variant: 'link',
  },
}

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
}

export const Icon: Story = {
  args: {
    children: '🚀',
    size: 'icon',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
}

export const ResponsiveSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm font-medium">Responsive Button Sizes</div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" className="text-xs sm:text-sm">Small</Button>
        <Button size="default" className="text-sm sm:text-base">Default</Button>
        <Button size="lg" className="text-base sm:text-lg">Large</Button>
      </div>
      <div className="text-xs text-muted-foreground">
        Buttons automatically adjust size and spacing for mobile and desktop
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons that adapt their size and spacing based on screen size for optimal mobile and desktop experience.',
      },
    },
  },
}

export const MobileOptimized: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm font-medium">Mobile-Optimized Buttons</div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button className="w-full sm:w-auto h-12 sm:h-10 text-base sm:text-sm">
          Full Width on Mobile
        </Button>
        <Button variant="outline" className="w-full sm:w-auto h-12 sm:h-10 text-base sm:text-sm">
          Touch Friendly
        </Button>
      </div>
      <div className="text-xs text-muted-foreground">
        Buttons expand to full width on mobile for better touch targets
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons optimized for mobile devices with full-width layout and larger touch targets.',
      },
    },
  },
}
