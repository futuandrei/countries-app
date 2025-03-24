# Countries Fullstack

A Country full-stack application. Running country list alone, requires frontend only. Running supabase backend with test data requires running backend.

## Country app features:

- Authentication (Google Cloud)
- View countries
- View country basic details (Rest Country API):
  - Capital
  - Region, eg. Europe
  - Population
  - Language
  - Currencies
- Viewing country additional, wikipedia details (Wikipedia API)
- Adding country to favorite
- Viewing country weather info (Openweather API)

## Project Structure

```shell
project-root/
├── backend/   # NestJS application (Supabase)
└── frontend/  # React application (Countries)
```

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
cd <project-directory>
```

2. Install all dependencies (both frontend and backend):

```bash
npm install
```

```bash
npm run install:all
```

## Development

Start both frontend and backend development servers:

```bash
npm run dev
```

The applications will be available at:

- Frontend: http://localhost:5180
- Backend: http://localhost:5001

### Available Commands

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only the frontend
- `npm run dev:backend` - Start only the backend
- `npm run install:all` - Install dependencies for both projects
- `npm run install:frontend` - Install frontend dependencies
- `npm run install:backend` - Install backend dependencies
- `npm run build` - Build both projects
- `npm run build:frontend` - Build frontend only
- `npm run build:backend` - Build backend only

## Environment Setup

1. Create a `.env` file in the backend directory:

```env
SUPABASE_URL=https://your-supabase-instance.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

## Tech Stack

- **Frontend:**
  - React
  - TypeScript
  - Vite
- **Backend:**
  - NestJS
  - TypeScript
  - Supabase

## Development Notes

- The backend includes CORS configuration for the frontend port (5180)
- TypeScript is configured for both frontend and backend
- ESLint and Prettier are set up for code formatting
- Both applications include hot-reload functionality for development
