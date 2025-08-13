import type { Meta, StoryObj } from '@storybook/react';
import { ChatMessage } from './chat-message';

const meta: Meta<typeof ChatMessage> = {
  title: 'UI/ChatMessage',
  component: ChatMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleUserMessage = {
  id: "1",
  content: "Hello! Can you help me with a coding problem?",
  role: "user" as const,
  timestamp: new Date("2024-01-15T10:30:00Z"),
};

const sampleAssistantMessage = {
  id: "2",
  content: "Of course! I'd be happy to help you with your coding problem. What specific issue are you facing?",
  role: "assistant" as const,
  timestamp: new Date("2024-01-15T10:31:00Z"),
  model: "gpt-4",
  usage: {
    promptTokens: 15,
    completionTokens: 25,
    totalTokens: 40,
  },
};

const longAssistantMessage = {
  id: "3",
  content: `Here's a comprehensive solution to your coding problem:

\`\`\`javascript
function exampleFunction() {
  // This is a sample function
  const result = processData(input);
  return result;
}

// Helper function
function processData(data) {
  return data.map(item => ({
    ...item,
    processed: true
  }));
}
\`\`\`

This solution includes:
1. **Error handling** - Proper try-catch blocks
2. **Performance optimization** - Efficient data processing
3. **Code readability** - Clear variable names and comments
4. **Best practices** - Following modern JavaScript conventions

Let me know if you need any clarification or have questions about specific parts of the implementation!`,
  role: "assistant" as const,
  timestamp: new Date("2024-01-15T10:32:00Z"),
  model: "gpt-4",
  usage: {
    promptTokens: 20,
    completionTokens: 150,
    totalTokens: 170,
  },
};

const codeMessage = {
  id: "4",
  content: `Here's the React component you requested:

\`\`\`tsx
import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick
}) => {
  return (
    <button
      className={\`btn btn-\${variant} btn-\${size}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
\`\`\`

This component includes TypeScript interfaces and proper prop handling.`,
  role: "assistant" as const,
  timestamp: new Date("2024-01-15T10:33:00Z"),
  model: "claude-3",
  usage: {
    promptTokens: 30,
    completionTokens: 120,
    totalTokens: 150,
  },
};

export const UserMessage: Story = {
  args: {
    message: sampleUserMessage,
  },
};

export const AssistantMessage: Story = {
  args: {
    message: sampleAssistantMessage,
  },
};

export const LongMessage: Story = {
  args: {
    message: longAssistantMessage,
  },
};

export const CodeMessage: Story = {
  args: {
    message: codeMessage,
  },
};

export const MessageWithDifferentModels: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-2xl">
      <ChatMessage
        message={{
          id: "5",
          content: "What's the difference between GPT-4 and Claude?",
          role: "user",
          timestamp: new Date("2024-01-15T10:34:00Z"),
        }}
      />
      <ChatMessage
        message={{
          id: "6",
          content: "GPT-4 and Claude are both advanced language models, but they have different strengths. GPT-4 excels at creative tasks and code generation, while Claude is particularly good at analysis and following instructions precisely.",
          role: "assistant",
          timestamp: new Date("2024-01-15T10:35:00Z"),
          model: "gpt-4",
          usage: {
            promptTokens: 12,
            completionTokens: 45,
            totalTokens: 57,
          },
        }}
      />
      <ChatMessage
        message={{
          id: "7",
          content: "Claude is designed to be helpful, harmless, and honest. It's particularly good at tasks that require careful reasoning and following complex instructions.",
          role: "assistant",
          timestamp: new Date("2024-01-15T10:36:00Z"),
          model: "claude-3",
          usage: {
            promptTokens: 15,
            completionTokens: 35,
            totalTokens: 50,
          },
        }}
      />
    </div>
  ),
};

export const Conversation: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-2xl">
      <ChatMessage
        message={{
          id: "8",
          content: "Can you help me create a responsive navigation component?",
          role: "user",
          timestamp: new Date("2024-01-15T10:37:00Z"),
        }}
      />
      <ChatMessage
        message={{
          id: "9",
          content: "I'd be happy to help! Here's a responsive navigation component using React and Tailwind CSS:",
          role: "assistant",
          timestamp: new Date("2024-01-15T10:38:00Z"),
          model: "gpt-4",
          usage: {
            promptTokens: 18,
            completionTokens: 20,
            totalTokens: 38,
          },
        }}
      />
      <ChatMessage
        message={{
          id: "10",
          content: `\`\`\`tsx
import React, { useState } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Logo</h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">About</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Contact</a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Home</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900">About</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Contact</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
\`\`\`

This component includes:
- Responsive design with mobile-first approach
- Hamburger menu for mobile devices
- Smooth transitions and hover effects
- Accessible button and navigation elements`,
          role: "assistant",
          timestamp: new Date("2024-01-15T10:39:00Z"),
          model: "gpt-4",
          usage: {
            promptTokens: 25,
            completionTokens: 200,
            totalTokens: 225,
          },
        }}
      />
      <ChatMessage
        message={{
          id: "11",
          content: "Thank you! This is exactly what I needed. The mobile menu toggle works perfectly.",
          role: "user",
          timestamp: new Date("2024-01-15T10:40:00Z"),
        }}
      />
    </div>
  ),
};

export const ErrorMessage: Story = {
  args: {
    message: {
      id: "12",
      content: "I apologize, but I encountered an error while processing your request. Please try again or contact support if the issue persists.",
      role: "assistant" as const,
      timestamp: new Date("2024-01-15T10:41:00Z"),
      model: "gpt-4",
    },
  },
};

export const ResponsiveDesign: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-4xl">
      <div className="text-sm text-muted-foreground mb-4">
        This story demonstrates the responsive design of chat messages across different screen sizes.
      </div>
      <ChatMessage
        message={{
          id: "13",
          content: "This message demonstrates responsive design with proper spacing and layout on mobile, tablet, and desktop screens.",
          role: "assistant",
          timestamp: new Date("2024-01-15T10:42:00Z"),
          model: "gpt-4",
          usage: {
            promptTokens: 10,
            completionTokens: 20,
            totalTokens: 30,
          },
        }}
      />
      <ChatMessage
        message={{
          id: "14",
          content: "The interface adapts beautifully to different screen sizes with proper padding, margins, and text sizing.",
          role: "user",
          timestamp: new Date("2024-01-15T10:43:00Z"),
        }}
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};
