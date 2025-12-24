# VivaFemini Frontend

A modern menstrual cycle tracking application built with Next.js, React, and TypeScript.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Date Utilities**: date-fns

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- Yarn or npm
- The backend server running (see backend README)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd vivafemini/frontend
```

### 2. Install dependencies

```bash
yarn install
# or
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Run the development server

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Create production build |
| `yarn start` | Start production server |
| `yarn lint` | Run ESLint |

## Project Structure

```
frontend/
├── public/              # Static assets (images, icons)
│   ├── icons/          # Icon images
│   ├── Image/          # General images
│   └── image/          # Additional images
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── home/       # Home page
│   │   ├── tracking/   # Symptom tracking page
│   │   └── health-report/ # Health report page
│   ├── components/     # React components
│   │   ├── home/       # Home page components
│   │   ├── tracking/   # Tracking page components
│   │   ├── health-report/ # Health report components
│   │   ├── layout/     # Layout components (Header, Nav)
│   │   └── ui/         # Reusable UI components
│   ├── services/       # API service functions
│   ├── store/          # Zustand state stores
│   ├── types/          # TypeScript type definitions
│   └── lib/            # Utility functions and constants
└── tailwind.config.ts  # Tailwind CSS configuration
```

## Features

- **Home Dashboard**: Calendar widget, cycle day indicator, daily tips, trend tracking
- **Symptom Tracking**: Log physical pain, mood, period indicators, and flow intensity
- **Health Reports**: View cycle summaries, symptom frequency charts, and historical data
- **Responsive Design**: Mobile-first design with bottom navigation on mobile devices

## Building for Production

```bash
yarn build
yarn start
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
# vivafemini-test
