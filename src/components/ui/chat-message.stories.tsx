import type { Meta, StoryObj } from '@storybook/react'
import { ChatMessage } from './chat-message'

const meta: Meta<typeof ChatMessage> = {
  title: 'UI/ChatMessage',
  component: ChatMessage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A chat message component that displays user and AI messages with responsive design and interactive features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      description: 'The message object containing content, role, and metadata',
    },
    onCopy: {
      description: 'Optional callback function when message is copied',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleUserMessage = {
  id: '1',
  content: 'Hello! Can you help me with a coding problem?',
  role: 'user' as const,
  timestamp: new Date('2024-01-15T10:30:00Z'),
}

const sampleAIMessage = {
  id: '2',
  content: `Of course! I'd be happy to help you with your coding problem. 

What specific issue are you facing? Please share:
- The programming language you're using
- The error message (if any)
- What you're trying to accomplish
- What you've already tried

This will help me provide the most relevant assistance.`,
  role: 'assistant' as const,
  timestamp: new Date('2024-01-15T10:30:30Z'),
  model: 'GPT-4o',
  usage: {
    promptTokens: 25,
    completionTokens: 89,
    totalTokens: 114,
  },
}

const longAIMessage = {
  id: '3',
  content: `Here's a comprehensive solution to your coding problem:

## Problem Analysis
The issue you're experiencing is commonly caused by asynchronous operations not being properly awaited or handled.

## Solution Steps
1. **Identify the async function** that's causing the issue
2. **Add proper error handling** with try-catch blocks
3. **Ensure all promises are awaited** before proceeding
4. **Validate input data** before processing

## Code Example
\`\`\`javascript
async function processData(data) {
  try {
    // Validate input
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format');
    }
    
    // Process data
    const result = await someAsyncOperation(data);
    
    // Return result
    return result;
  } catch (error) {
    console.error('Processing failed:', error);
    throw error;
  }
}
\`\`\`

## Best Practices
- Always use try-catch for error handling
- Validate inputs early
- Use TypeScript for better type safety
- Write unit tests for edge cases

Let me know if you need clarification on any of these points!`,
  role: 'assistant' as const,
  timestamp: new Date('2024-01-15T10:31:00Z'),
  model: 'Claude 3 Sonnet',
  usage: {
    promptTokens: 45,
    completionTokens: 234,
    totalTokens: 279,
  },
}

export const UserMessage: Story = {
  args: {
    message: sampleUserMessage,
  },
}

export const AIMessage: Story = {
  args: {
    message: sampleAIMessage,
  },
}

export const LongMessage: Story = {
  args: {
    message: longAIMessage,
  },
}

export const WithCopyFunction: Story = {
  args: {
    message: sampleAIMessage,
    onCopy: () => console.log('Message copied!'),
  },
}

export const ResponsiveLayout: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-4">
      <div className="text-sm font-medium text-center mb-4">Responsive Chat Layout</div>
      
      {/* Mobile Layout */}
      <div className="block sm:hidden">
        <div className="text-xs text-muted-foreground mb-2">Mobile View</div>
        <ChatMessage message={sampleUserMessage} />
        <ChatMessage message={sampleAIMessage} />
      </div>
      
      {/* Desktop Layout */}
      <div className="hidden sm:block">
        <div className="text-xs text-muted-foreground mb-2">Desktop View</div>
        <ChatMessage message={sampleUserMessage} />
        <ChatMessage message={sampleAIMessage} />
      </div>
      
      <div className="text-xs text-muted-foreground text-center">
        Messages automatically adjust spacing and layout for different screen sizes
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Chat messages that adapt their layout and spacing based on screen size for optimal mobile and desktop experience.',
      },
    },
  },
}

export const MobileOptimized: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <div className="text-sm font-medium text-center mb-4">Mobile-Optimized Messages</div>
      
      <ChatMessage message={sampleUserMessage} />
      <ChatMessage message={sampleAIMessage} />
      
      <div className="text-xs text-muted-foreground text-center p-4 bg-muted rounded-lg">
        <div className="font-medium mb-1">Mobile Features:</div>
        <div>• Touch-friendly spacing</div>
        <div>• Optimized typography</div>
        <div>• Responsive action buttons</div>
        <div>• Adaptive message width</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Chat messages optimized for mobile devices with touch-friendly controls and responsive design.',
      },
    },
  },
}
