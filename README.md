# AI Interface - Next.js 13+ AI Chat Application

A modern, responsive AI interface built with Next.js 13+, TypeScript, and Tailwind CSS. Features a comprehensive chat interface with advanced parameter controls, template management, and mobile-responsive design.

## ✨ Features

### 🎯 Core Functionality
- **AI Chat Interface**: Real-time chat with AI models
- **Model Selection**: Choose from multiple AI models (GPT-4o, Claude 3, Gemini Pro, etc.)
- **Advanced Parameters**: Full control over temperature, max tokens, top P, frequency penalty, and presence penalty
- **Template Management**: Save, load, and organize prompt templates
- **Chat History**: Persistent chat sessions with export functionality

### 🎨 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Built-in theme switching with system preference detection
- **Template Library**: 8 predefined templates + custom template saving
- **Quick Actions**: One-click template loading and chat export
- **Keyboard Shortcuts**: Enter to send, Shift+Enter for new lines

### 📱 Mobile Responsiveness
- **Collapsible Sidebar**: Mobile-friendly navigation with slide-out menu
- **Touch Optimized**: Responsive controls and touch-friendly interface
- **Adaptive Layout**: Automatically adjusts to screen size
- **Mobile-First**: Designed with mobile users in mind

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd ai-interface

# Install dependencies
npm install

# Run development server
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

## 🏗️ Architecture

### File Structure
```
src/
├── app/                    # Next.js 13+ app directory
│   ├── api/               # API routes
│   │   ├── chat/         # Chat endpoint
│   │   ├── models/       # Model definitions
│   │   └── templates/    # Template management
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Sidebar.tsx       # Main sidebar component
│   └── ChatArea.tsx      # Chat interface component
└── lib/                  # Utility functions
    └── theme-provider.tsx # Theme management
```

### Key Components

#### Sidebar Component
- **Model Selection**: Dropdown for AI model selection
- **Parameter Controls**: Advanced parameter adjustment panels
- **Theme Toggle**: Located in the header for easy access
- **Responsive Design**: Adapts to different screen sizes

#### ChatArea Component
- **Message Display**: User and AI message rendering
- **Template Button**: Quick access to template library
- **Prompt Editor**: Textarea with template integration
- **Export Functionality**: Download chat history as JSON

#### Template System
- **Predefined Templates**: 8 ready-to-use prompt templates
- **Custom Templates**: Save and organize your own templates
- **Quick Loading**: One-click template application
- **Category Organization**: Organize templates by purpose

## 🎛️ Parameters & Controls

### Temperature (0-1)
- Controls creativity vs. precision
- Lower values = more focused, higher values = more creative

### Max Tokens (100-4000)
- Maximum response length
- Adjustable with step controls

### Top P (0-1)
- Nucleus sampling control
- Lower values = more focused, higher values = more diverse

### Frequency Penalty (-2 to 2)
- Controls repetition in responses
- Negative values encourage repetition, positive values discourage it

### Presence Penalty (-2 to 2)
- Controls topic diversity
- Negative values encourage staying on topic, positive values encourage new topics

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (sm to lg)
- **Desktop**: > 1024px (lg)

### Mobile Features
- Collapsible sidebar with slide-out menu
- Touch-optimized controls
- Adaptive spacing and typography
- Full-width mobile sidebar

## 🎨 Theme System

### Light Theme
- Clean, professional appearance
- High contrast for readability
- Optimized for daytime use

### Dark Theme
- Easy on the eyes
- Modern, sleek design
- Perfect for low-light environments

### System Preference
- Automatically detects system theme
- Seamless theme switching
- Persistent theme selection

## 🔧 Development

### Scripts
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint checking
npm run type-check   # TypeScript checking
```

### Storybook
```bash
npm run storybook    # Launch Storybook
npm run build-storybook # Build Storybook
```

### Code Quality
- TypeScript strict mode enabled
- ESLint configuration
- Prettier formatting
- Component documentation

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Vercel will auto-detect Next.js
3. Automatic deployments on push

### Other Platforms
- Netlify
- AWS Amplify
- Docker deployment
- Traditional hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with Next.js 13+ App Router
- UI components from Radix UI
- Styling with Tailwind CSS
- Icons from Lucide React
- Theme management with next-themes

---

**Built with ❤️ using modern web technologies**
