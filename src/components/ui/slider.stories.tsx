import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './slider';
import { useState } from 'react';

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: { type: 'number' },
    },
    max: {
      control: { type: 'number' },
    },
    step: {
      control: { type: 'number' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: [50],
    max: 100,
    min: 0,
    step: 1,
  },
};

export const Temperature: Story = {
  args: {
    value: [0.7],
    max: 1,
    min: 0,
    step: 0.1,
    'aria-label': 'Temperature control',
    'aria-describedby': 'temperature-description',
    'aria-valuetext': 'Temperature: 0.7, Balanced',
  },
  render: (args) => (
    <div className="w-80 space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Temperature</label>
        <span className="text-sm text-muted-foreground">{args.value?.[0]}</span>
      </div>
      <Slider {...args} />
      <div id="temperature-description" className="text-xs text-muted-foreground">
        Controls randomness: Lower values are more focused, higher values are more creative
      </div>
    </div>
  ),
};

export const MaxTokens: Story = {
  args: {
    value: [1000],
    max: 4000,
    min: 100,
    step: 100,
    'aria-label': 'Maximum tokens control',
    'aria-describedby': 'max-tokens-description',
    'aria-valuetext': 'Maximum tokens: 1000, Medium response',
  },
  render: (args) => (
    <div className="w-80 space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Max Tokens</label>
        <span className="text-sm text-muted-foreground">{args.value?.[0]?.toLocaleString()}</span>
      </div>
      <Slider {...args} />
      <div id="max-tokens-description" className="text-xs text-muted-foreground">
        Maximum number of tokens in the AI response (100-4000)
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    value: [50],
    max: 100,
    min: 0,
    step: 1,
    disabled: true,
  },
};

export const Range: Story = {
  args: {
    value: [25, 75],
    max: 100,
    min: 0,
    step: 1,
    'aria-label': 'Range slider',
  },
  render: (args) => (
    <div className="w-80 space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Range</label>
        <span className="text-sm text-muted-foreground">
          {args.value?.[0]} - {args.value?.[1]}
        </span>
      </div>
      <Slider {...args} />
    </div>
  ),
};

export const WithSteps: Story = {
  args: {
    value: [2],
    max: 5,
    min: 1,
    step: 1,
    'aria-label': 'Rating slider',
  },
  render: (args) => (
    <div className="w-80 space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Rating</label>
        <span className="text-sm text-muted-foreground">{args.value?.[0]}/5</span>
      </div>
      <Slider {...args} />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Poor</span>
        <span>Fair</span>
        <span>Good</span>
        <span>Very Good</span>
        <span>Excellent</span>
      </div>
    </div>
  ),
};

// Interactive story with state
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState([50]);
    
    return (
      <div className="w-80 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Interactive Slider</label>
          <span className="text-sm text-muted-foreground">{value[0]}%</span>
        </div>
        <Slider 
          value={value}
          onValueChange={setValue}
          max={100}
          min={0}
          step={1}
          aria-label="Interactive slider"
        />
        <div className="text-xs text-muted-foreground">
          Current value: {value[0]}%
        </div>
      </div>
    );
  },
};
