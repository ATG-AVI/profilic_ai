# Social Agent Frontend

A modern Next.js frontend for the Social Agent profile analysis tool.

## Features

- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 🌙 **Dark Mode**: Automatic dark/light theme support
- ⚡ **Real-time Analysis**: Live profile analysis with loading states
- 📊 **Rich Results**: Detailed analysis with similar people, statistics, and genre classification
- 🔗 **Direct Links**: Easy access to original profiles
- 📱 **Mobile Friendly**: Responsive design that works on all devices

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js 18+ 
- Backend server running (see main README)

### Installation

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file in the frontend directory:

```env
BACKEND_URL=http://localhost:3001
```

## Usage

1. Enter a social profile URL (Twitter, LinkedIn, etc.)
2. Click "Analyze Profile" 
3. View the analysis results including:
   - Profile details and genre classification
   - Similar people with similarity scores
   - Knowledge base statistics
   - Processing metrics

## Development

### Project Structure

```
frontend/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── lib/                # Utility functions
├── public/             # Static assets
└── package.json        # Dependencies
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Integration

The frontend communicates with the backend through:

- **API Route**: `/api/analyze` (proxies to backend)
- **Backend URL**: Configurable via `BACKEND_URL` environment variable
- **Request Format**: `{ profileUrl: string, topK: number }`
- **Response Format**: See backend documentation

## Styling

The app uses a custom design system with:

- **CSS Variables**: For consistent theming
- **Tailwind Utilities**: For rapid styling
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Automatic theme switching

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Test on both light and dark themes
4. Ensure mobile responsiveness
