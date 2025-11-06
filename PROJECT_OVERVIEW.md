# TuRefri Project Overview

## 📱 What is TuRefri?

**TuRefri** (Spanish for "Your Fridge") is a Progressive Web App (PWA) that appears to be a neighborhood/local business discovery platform. The app uses a creative "fridge" metaphor where users can:

- **Discover local businesses and stores** - Browse stores, promotions, and events in their neighborhood
- **Use interactive magnets** - Add and organize "magnets" (likely representing businesses, promotions, or events) on a customizable fridge interface
- **Map integration** - View locations on a map
- **QR Code scanning** - Scan QR codes for quick access
- **User profiles** - Create accounts, manage profiles, and organize magnet groups
- **Events and promotions** - Browse local events and special offers

The app tagline is **"Tu barrio en una app"** (Your neighborhood in an app).

## 🏗️ Project Architecture

### Tech Stack
- **Frontend Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **Backend Services**: AWS Amplify (Authentication, GraphQL API, S3 storage)
- **PWA Features**: Service workers, offline support, installable
- **UI Libraries**: 
  - Framer Motion (animations)
  - Headless UI (accessible components)
  - Sonner (toast notifications)
- **Additional Features**: QR code scanning, webcam integration, map functionality

### Project Structure

```
tr-tu-refri-rjs-app/
├── src/
│   ├── components/        # React components
│   │   ├── authentication/  # Login, signup, password reset
│   │   ├── map/            # Map-related components
│   │   ├── qrScanner/      # QR code scanning
│   │   └── userProfile/   # User profile components
│   ├── context/           # React Context providers
│   ├── routes/            # Route components
│   ├── hooks/             # Custom React hooks
│   ├── functions/         # Utility functions (auth, GraphQL, S3)
│   ├── graphql/           # GraphQL queries and mutations
│   ├── types/             # TypeScript type definitions
│   ├── data/              # Static JSON data
│   └── utils/             # Helper functions
├── public/                # Static assets (images, icons, PWA assets)
├── amplify/               # AWS Amplify configuration
└── dev-dist/              # Development build output
```

### Key Features

1. **Fridge Interface**: The main UI is a customizable "fridge" with different colors where users can place "magnets"
2. **Magnet Groups**: Users can organize magnets into groups
3. **Store Discovery**: Browse and search for local stores
4. **Map View**: Interactive map showing locations
5. **Events**: Browse local events
6. **Authentication**: Full auth flow with AWS Amplify (login, signup, password reset)
7. **PWA**: Installable app with offline support

## 🚀 How to Run the Project

### Prerequisites

1. **Node.js** (v18 or higher recommended)
2. **pnpm** package manager (the project uses `pnpm-lock.yaml`)
   - Install pnpm: `npm install -g pnpm`
3. **AWS Amplify Configuration** - The app requires an `amplifyconfiguration.json` file

### Step 1: Install Dependencies

```bash
pnpm install
```

If you don't have pnpm, you can use npm instead:
```bash
npm install
```

### Step 2: Configure AWS Amplify

⚠️ **IMPORTANT**: The app requires an `amplifyconfiguration.json` file in the `src/` directory. This file contains AWS Amplify configuration for:
- Authentication (Cognito)
- GraphQL API (AppSync)
- Storage (S3)
- OAuth redirect URIs

**You need to:**
1. Set up an AWS Amplify project, OR
2. Get the `amplifyconfiguration.json` file from your team/previous setup, OR
3. Generate it using AWS Amplify CLI:
   ```bash
   amplify pull
   ```

The configuration file should look something like:
```json
{
  "aws_project_region": "us-east-1",
  "aws_cognito_identity_pool_id": "...",
  "aws_cognito_region": "us-east-1",
  "oauth": {
    "domain": "...",
    "scope": ["email", "openid", "profile"],
    "redirectSignIn": "http://localhost:5173/,https://turefri.com/,...",
    "redirectSignOut": "http://localhost:5173/,https://turefri.com/,..."
  },
  "aws_user_pools_id": "...",
  "aws_user_pools_web_client_id": "...",
  "aws_appsync_graphqlEndpoint": "...",
  "aws_appsync_region": "us-east-1",
  "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
  "aws_user_files_s3_bucket": "...",
  "aws_user_files_s3_bucket_region": "..."
}
```

### Step 3: Run Development Server

```bash
pnpm dev
```

or with npm:
```bash
npm run dev
```

The app will start on `http://localhost:5173` (default Vite port).

### Step 4: Build for Production

```bash
pnpm build
```

This will:
1. Type-check the TypeScript code
2. Build the optimized production bundle
3. Generate PWA assets

### Step 5: Preview Production Build

```bash
pnpm preview
```

## 📝 Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Run ESLint
- `pnpm generate-pwa-assets` - Generate PWA icons and assets

## 🔑 Key Routes

- `/` - Main fridge interface (TuRefri)
- `/auth/login` - Login page
- `/auth/signup` - Sign up page
- `/auth/confirm-code` - Email verification
- `/auth/reset-password` - Password reset
- `/profile` - User profile
- `/user-profile` - Another profile view
- `/map` - Map view with locations
- `/events` - Events listing
- `/scan` - QR code scanner
- `/emergency` - Emergency page
- `/contact` - Contact page
- `/location/:id` - Individual location details

## 🎨 Context Providers

The app uses several React Context providers:
- `UserContextProvider` - User authentication state
- `GlobalProvider` - Global app state
- `MagnetGroupsProvider` - Magnet groups management
- `FridgeProvider` - Fridge color customization
- `DetailMagnetProvider` - Magnet detail view state

## ⚠️ Common Issues

1. **Missing `amplifyconfiguration.json`**: 
   - The app won't start without this file
   - You need AWS Amplify backend configured

2. **OAuth Redirect URIs**: 
   - The app automatically selects the correct redirect URI based on hostname
   - Supports: localhost, develop.d1xzs5vscda5ax.amplifyapp.com, turefri.com

3. **Environment Variables**: 
   - Check if any `.env` files are needed (currently none found)
   - Some features might require API keys (e.g., IP geolocation service)

## 🔧 Development Notes

- The app uses **lazy loading** for route components for better performance
- **PWA features** are enabled in development mode
- **TypeScript** is strictly configured
- **Tailwind CSS** is used for styling
- The app is optimized for mobile-first design

## 📦 Dependencies Highlights

- **aws-amplify**: AWS backend services integration
- **react-router-dom**: Client-side routing
- **framer-motion**: Smooth animations
- **jsqr**: QR code scanning
- **react-webcam**: Camera access for QR scanning
- **axios**: HTTP requests
- **sonner**: Toast notifications

---

**Note**: This project appears to be a production application. Make sure you have proper AWS credentials and backend services configured before running.

