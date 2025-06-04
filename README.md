# البركة بلاست - Baraka Plast

## Overview
A modern React application for a plastic bag manufacturing company, built with TypeScript, Vite, and Tailwind CSS.

## 🚀 Features
- Responsive design optimized for all devices
- RTL support for Arabic language
- Product catalog with detailed views
- Quote request system
- Contact forms
- Testimonials section
- FAQ section
- Dark mode support

## 🛠 Tech Stack
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router DOM
- React Query
- Lucide Icons

## 📁 Project Structure
```
src/
├── components/         # React components
│   ├── ui/            # UI components from shadcn/ui
│   └── products/      # Product-related components
├── constants/         # Application constants
├── hooks/             # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Page components
├── types/            # TypeScript type definitions
└── utils/            # Helper functions
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables
```env
VITE_APP_TITLE=البركة بلاست
```

## 📱 Key Components

### Products Module
- Product listing with grid/list views
- Detailed product pages
- Quote request system
- Image galleries

### Contact Forms
- Quote request form
- Contact form with validation
- WhatsApp integration

### UI Components
- Responsive navigation
- Floating action buttons
- Modal dialogs
- Toast notifications

## 🔧 Development

### Code Style
- Follow TypeScript best practices
- Use functional components
- Implement proper error handling
- Follow React hooks best practices

### Component Structure
```typescript
// Component template
import React from 'react';
import { ComponentProps } from './types';

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  return (
    // JSX
  );
};

export default Component;
```

### State Management
- Use React Query for server state
- Use React Context for theme/language
- Local state with useState where appropriate

## 🌐 Deployment
The application can be deployed using:
- Netlify
- Vercel
- GitHub Pages

## 📝 Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a pull request

## 📜 License
MIT License

## 👥 Contact
For questions or support, please contact:
- Email: info@elbarkaplast.com
- Phone: 01009923040