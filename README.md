# AI Interface

A modern, responsive AI chat interface built with Next.js, TypeScript, and Tailwind CSS. This application provides a ChatGPT-like experience with advanced features for managing conversations, templates, and AI model parameters.

## ✨ Features

### 🚀 Core Functionality
- **Real-time AI Chat**: Interactive conversations with AI models
- **Multiple Chat Management**: Create, switch, and manage multiple conversations
- **Auto-scroll**: Automatic scrolling to latest messages
- **Message History**: Persistent chat history during session
- **Template System**: Save and load reusable prompt templates

### 🎨 Modern UI/UX
- **ChatGPT-like Interface**: Familiar layout and interactions
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark/Light Theme**: Toggle between themes with persistent storage
- **Smooth Animations**: Framer Motion powered transitions
- **Accessibility**: ARIA labels and keyboard navigation

### ⚙️ Advanced Settings
- **Model Selection**: Choose from different AI models (GPT-4, Claude, etc.)
- **Parameter Control**: Adjust temperature and max tokens
- **Real-time Updates**: Settings apply immediately to conversations
- **Scrollable Settings**: Organized settings with proper scrolling

### 📱 Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Collapsible Sidebar**: Slide-out navigation on mobile
- **Touch-Friendly**: Large touch targets and gestures
- **Adaptive Layout**: Content adjusts to screen size
- **Cross-Platform**: Works on all devices and browsers

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3 with custom design system
- **UI Components**: Shadcn/ui with Radix UI primitives
- **Animations**: Framer Motion
- **State Management**: React hooks with local storage
- **Icons**: Lucide React
- **Documentation**: Storybook for component development

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-interface
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Additional Commands

```bash
# Build for production
npm run build

# Start production server
npm start

# Run Storybook
npm run storybook

# Build Storybook
npm run build-storybook

# Lint code
npm run lint
```

## 📖 Usage Guide

### Creating a New Chat
1. Click the "New chat" button in the sidebar
2. A fresh conversation will be created with a welcome message
3. Start typing your prompt in the input area

### Managing Conversations
- **Switch Chats**: Click any chat in the sidebar to switch
- **Chat Titles**: Automatically update based on first user message
- **Chat History**: All conversations persist during the session

### Using Templates
1. **Save Template**: Type a prompt and click "Save Template"
2. **Load Template**: Click "Load Template" to see available templates
3. **Apply Template**: Click any template to load it into the prompt editor

### Adjusting Settings
- **Model Selection**: Choose your preferred AI model
- **Temperature**: Control creativity (0.0 = focused, 1.0 = creative)
- **Max Tokens**: Set maximum response length
- **Real-time**: Changes apply immediately to new messages

### Responsive Features
- **Mobile**: Tap menu button to open sidebar
- **Tablet**: Sidebar adapts to available space
- **Desktop**: Full sidebar always visible
- **Touch**: Swipe gestures and touch-friendly controls

## 🎯 Key Components

### Chat Interface
- **Message Display**: User and AI messages with timestamps
- **Auto-scroll**: Automatically scrolls to new messages
- **Copy/Download**: Copy messages or download as JSON
- **Model Badges**: Shows which model generated each response

### Sidebar Navigation
- **Chat History**: List of all conversations
- **New Chat**: Create fresh conversations
- **Settings Panel**: Model and parameter controls
- **Template Management**: Save and load prompt templates

### Prompt Editor
- **Fixed Position**: Always accessible at bottom
- **Character Count**: Real-time character tracking
- **Keyboard Shortcuts**: Ctrl+Enter to send
- **Template Integration**: Load saved templates

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=your_api_url

# Theme Configuration
NEXT_PUBLIC_DEFAULT_THEME=system
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Custom color palette
- Responsive breakpoints
- Animation utilities
- Dark mode support

### Storybook Configuration
Storybook is configured for component development:
- Component documentation
- Interactive stories
- Responsive testing
- Accessibility testing

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (sm)
- **Tablet**: 768px - 1024px (md-lg)
- **Desktop**: > 1024px (lg+)

## 🎨 Design System

### Colors
- **Primary**: Brand colors for buttons and highlights
- **Secondary**: Supporting colors for backgrounds
- **Muted**: Subtle colors for borders and text
- **Accent**: Special colors for alerts and notifications

### Typography
- **Headings**: Clear hierarchy with proper sizing
- **Body Text**: Readable font sizes and line heights
- **Code**: Monospace font for code blocks
- **Labels**: Small, descriptive text

### Spacing
- **Consistent**: 4px base unit system
- **Responsive**: Adapts to screen size
- **Accessible**: Proper touch targets and spacing

## 🔍 Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Clear focus indicators
- **Color Contrast**: WCAG compliant color ratios
- **Screen Reader**: Optimized for assistive technologies

## 🚀 Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js image optimization
- **Bundle Analysis**: Optimized bundle sizes
- **Lazy Loading**: Components load when needed
- **Caching**: Efficient caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines
- Follow TypeScript strict mode
- Use Tailwind CSS for styling
- Write component stories for Storybook
- Ensure responsive design
- Test accessibility features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shadcn/ui** for the excellent component library
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Next.js** for the powerful React framework
- **Radix UI** for accessible primitives

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the Storybook examples

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
