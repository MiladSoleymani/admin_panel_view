# Frontend Stack & View Setup

## Overview
This document outlines the frontend technology stack, UI framework, and setup instructions for the admin panel view.

## Technology Stack

### Core Framework
**Next.js (React Framework)**
- **Version:** 14+ (App Router)
- **Language:** TypeScript
- **Why Next.js:**
  - Built-in routing system
  - Server-Side Rendering (SSR) for better SEO and performance
  - API routes for backend integration
  - Image optimization out of the box
  - Excellent developer experience
  - Production-ready with minimal configuration
  - Great for building full-stack applications

### UI Framework
**Material-UI (MUI) v5**
- **Why Material-UI:**
  - Comprehensive component library
  - Material Design principles
  - 60+ production-ready components
  - Excellent TypeScript support
  - Theming and customization
  - Built-in dark mode support
  - Large community and great documentation
  - Accessibility (a11y) built-in

### Admin Template
**Material Dashboard**
- Pre-built admin dashboard components
- Professional and modern design
- Responsive layout out of the box
- Pre-configured navigation
- Charts and data visualization
- Form components
- Table components with sorting/filtering
- Authentication pages

### State Management
**Redux Toolkit**
- **Why Redux Toolkit:**
  - Official, recommended way to write Redux logic
  - Reduces boilerplate code
  - Built-in best practices
  - Excellent DevTools for debugging
  - Perfect for complex state management
  - Great for managing user sessions, app settings
  - RTK Query for API calls and caching

### Additional Libraries

#### Data Fetching
- **Axios** - HTTP client for API requests
- **RTK Query** - Built into Redux Toolkit for data fetching and caching
- **SWR** (alternative) - React Hooks for data fetching

#### Forms
- **React Hook Form** - Performant forms with easy validation
- **Yup** or **Zod** - Schema validation

#### Charts & Visualization
- **Recharts** - Composable charting library
- **Chart.js** with **react-chartjs-2**
- **MUI X Data Grid** - Advanced data tables

#### Date Handling
- **date-fns** - Modern JavaScript date utility library
- **dayjs** - Lightweight alternative to Moment.js

#### Icons
- **@mui/icons-material** - Material Design icons
- **react-icons** - Popular icon libraries

#### Utilities
- **lodash** - Utility functions
- **clsx** - Conditional className utility

## Project Structure

```
admin_panel_view/
├── public/
│   ├── images/
│   ├── icons/
│   └── favicon.ico
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Auth routes group
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── (dashboard)/         # Dashboard routes group
│   │   │   ├── layout.tsx       # Dashboard layout
│   │   │   ├── page.tsx         # Dashboard home
│   │   │   ├── users/           # User management
│   │   │   ├── applications/    # Application management
│   │   │   ├── analytics/       # Analytics pages
│   │   │   ├── subscriptions/   # Billing & subscriptions
│   │   │   └── settings/        # Settings pages
│   │   ├── api/                 # API routes
│   │   │   ├── auth/
│   │   │   └── proxy/           # Proxy to backend API
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home/landing page
│   ├── components/
│   │   ├── common/              # Reusable components
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   └── Table/
│   │   ├── layout/              # Layout components
│   │   │   ├── Header/
│   │   │   ├── Sidebar/
│   │   │   ├── Footer/
│   │   │   └── Breadcrumbs/
│   │   ├── dashboard/           # Dashboard-specific components
│   │   │   ├── StatsCard/
│   │   │   ├── RecentActivity/
│   │   │   └── QuickActions/
│   │   ├── users/               # User management components
│   │   │   ├── UserTable/
│   │   │   ├── UserForm/
│   │   │   └── UserDetail/
│   │   ├── applications/        # Application components
│   │   │   ├── AppCard/
│   │   │   ├── AppForm/
│   │   │   └── AppSettings/
│   │   └── charts/              # Chart components
│   │       ├── LineChart/
│   │       ├── BarChart/
│   │       └── PieChart/
│   ├── store/                   # Redux store
│   │   ├── index.ts             # Store configuration
│   │   ├── slices/              # Redux slices
│   │   │   ├── authSlice.ts
│   │   │   ├── userSlice.ts
│   │   │   ├── appSlice.ts
│   │   │   └── uiSlice.ts
│   │   └── api/                 # RTK Query APIs
│   │       ├── authApi.ts
│   │       ├── userApi.ts
│   │       └── appApi.ts
│   ├── lib/                     # Utilities and helpers
│   │   ├── axios.ts             # Axios configuration
│   │   ├── constants.ts         # App constants
│   │   └── utils.ts             # Utility functions
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useUser.ts
│   │   └── usePermissions.ts
│   ├── types/                   # TypeScript types
│   │   ├── user.ts
│   │   ├── application.ts
│   │   ├── auth.ts
│   │   └── api.ts
│   ├── styles/                  # Global styles
│   │   ├── globals.css
│   │   └── theme.ts             # MUI theme configuration
│   └── middleware.ts            # Next.js middleware (auth)
├── .env.local                   # Environment variables
├── .env.example                 # Example env file
├── next.config.js               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── package.json
└── README.md
```

## Dependencies

### Required Dependencies
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@mui/material": "^5.15.0",
    "@mui/icons-material": "^5.15.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "@reduxjs/toolkit": "^2.0.0",
    "react-redux": "^9.0.0",
    "axios": "^1.6.0",
    "react-hook-form": "^7.49.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "recharts": "^2.10.0",
    "date-fns": "^3.0.0",
    "clsx": "^2.1.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/node": "^20.10.0",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.0.0"
  }
}
```

## Setup Instructions

### Step 1: Initialize Next.js Project
```bash
npx create-next-app@latest admin_panel_view --typescript --tailwind --eslint --app --src-dir
cd admin_panel_view
```

### Step 2: Install Material-UI
```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install @mui/x-data-grid
```

### Step 3: Install Redux Toolkit
```bash
npm install @reduxjs/toolkit react-redux
```

### Step 4: Install Additional Libraries
```bash
# Form handling
npm install react-hook-form zod @hookform/resolvers

# HTTP client
npm install axios

# Charts
npm install recharts

# Date utilities
npm install date-fns

# Utilities
npm install clsx
```

### Step 5: Configure MUI Theme
Create `src/styles/theme.ts`:
```typescript
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
```

### Step 6: Setup Redux Store
Create `src/store/index.ts`:
```typescript
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Step 7: Environment Variables
Create `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/v1
NEXT_PUBLIC_APP_NAME=Admin Panel
```

## Configuration Files

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'your-domain.com'],
  },
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

module.exports = nextConfig;
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Key Features to Implement

### 1. Authentication Flow
- Login page with Material-UI components
- JWT token storage in localStorage/cookies
- Protected routes using Next.js middleware
- Auto-redirect on unauthorized access

### 2. Dashboard Layout
- Sidebar navigation
- Top header with user menu
- Breadcrumbs
- Notifications
- Responsive design (mobile hamburger menu)

### 3. User Management
- User list with MUI DataGrid
- Search and filtering
- User detail modal/page
- Create/Edit user forms
- Bulk actions

### 4. Application Management
- Application cards grid
- Application detail page
- Configuration forms
- Status management

### 5. Analytics Dashboard
- Stats cards with key metrics
- Charts (line, bar, pie) using Recharts
- Date range selector
- Export functionality

### 6. Settings
- Profile settings
- System settings
- Theme customization (dark mode toggle)
- Notification preferences

## Best Practices

### Code Organization
- One component per file
- Colocate related files
- Use index.ts for clean imports
- Separate business logic from UI

### TypeScript
- Define interfaces for all data structures
- Use strict mode
- Avoid `any` type
- Create reusable types

### Performance
- Use React.memo for expensive components
- Implement pagination for large lists
- Lazy load routes and components
- Optimize images with Next.js Image component

### State Management
- Keep local state when possible
- Use Redux for global state (auth, user, app settings)
- Use RTK Query for server state
- Normalize state shape

### Styling
- Use MUI's sx prop for component-specific styles
- Create theme variants for consistency
- Use CSS-in-JS with Emotion
- Responsive design with MUI breakpoints

## Development Workflow

### 1. Development Server
```bash
npm run dev
```
Runs on `http://localhost:3000`

### 2. Type Checking
```bash
npm run type-check
```

### 3. Linting
```bash
npm run lint
```

### 4. Build for Production
```bash
npm run build
npm run start
```

## Next Steps

1. **Initialize the Next.js project** with all dependencies
2. **Set up the folder structure** as defined above
3. **Configure MUI theme** with custom colors and typography
4. **Set up Redux store** with auth and user slices
5. **Create layout components** (Header, Sidebar, Footer)
6. **Implement authentication** (login, register, protected routes)
7. **Build dashboard** with stats cards and charts
8. **Create user management** pages and components
9. **Implement application management** features
10. **Add analytics and reporting** pages

## Material Dashboard Resources

### Official Templates
- [Material Dashboard React](https://www.creative-tim.com/product/material-dashboard-react)
- [MUI Dashboard Template](https://mui.com/store/items/minimal-dashboard/)
- [DevExpress React Dashboard](https://github.com/devias-io/material-kit-react)

### Free Alternatives
- [Minimal Dashboard](https://github.com/minimal-ui-kit/material-kit-react)
- [Flexy Next.js Dashboard](https://github.com/wrappixel/flexy-nextjs-free)

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Material-UI Docs](https://mui.com/material-ui/getting-started/)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)

## Estimated Timeline

- **Setup & Configuration:** 1 day
- **Layout & Navigation:** 2-3 days
- **Authentication:** 2 days
- **Dashboard:** 3-4 days
- **User Management:** 4-5 days
- **Application Management:** 4-5 days
- **Analytics:** 3-4 days
- **Settings & Polish:** 2-3 days

**Total:** 3-4 weeks for MVP (Minimum Viable Product)

## Notes

- Start with core features first (auth, dashboard, users)
- Iterate and add features incrementally
- Test on multiple screen sizes
- Follow Material Design guidelines
- Keep accessibility in mind
- Document custom components
- Write unit tests for critical components
