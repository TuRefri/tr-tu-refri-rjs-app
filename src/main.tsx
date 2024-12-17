import React, { Suspense }from 'react';
import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';
import { createRoot, Root } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Toaster } from 'sonner';
import './index.css';
import { FridgeProvider } from './context/fridge-color-context.tsx';
import { DetailMagnetProvider } from './context/detail-magnet-context.tsx';
import { GlobalProvider } from './context/global-context.tsx';
import 'aws-amplify/auth/enable-oauth-listener';

// Import components directly
// Lazy-load components
const RootComponent = React.lazy(() => import('./routes/root'));
const TuRefri = React.lazy(() => import('./routes/turefri'));
const ErrorPage = React.lazy(() => import('./error-page'));
import Map from './routes/map.tsx'
const Emergency = React.lazy(() => import('./routes/emergency.tsx'));
const Contact = React.lazy(() => import('./routes/contact.tsx'));
const Scan = React.lazy(() => import('./routes/scan.tsx'));
const Events = React.lazy(() => import('./routes/events.tsx'));
const Profile = React.lazy(() => import('./routes/profile.tsx'));
const Login = React.lazy(() => import('./routes/login.tsx'));
const SignUp = React.lazy(() => import('./routes/signup.tsx'));
const UserProfile = React.lazy(() => import('./routes/user-profile.tsx'));
const ConfirmCode = React.lazy(() => import('./routes/confirm-code.tsx'));
const ResetPasswordPage = React.lazy(() => import('./routes/reset-password.tsx'));
const LocationPage = React.lazy(() => import('./components/LocationPage.tsx'));
import { registerSW } from 'virtual:pwa-register'
import { UserContextProvider } from './context/user-auth.tsx';
registerSW({ immediate: true })

//Check if you are in localhost or production
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.0/8 are considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  )
  const signInURI = config.oauth.redirectSignIn.split(',')
  const signOutURI = config.oauth.redirectSignOut.split(',')
  if (isLocalhost) {
    config.oauth.redirectSignIn = signInURI[0]
    config.oauth.redirectSignOut = signOutURI[0]
  } else if (window.location.hostname === 'develop.d1xzs5vscda5ax.amplifyapp.com'
  ) {
    config.oauth.redirectSignIn = signInURI[2]
    config.oauth.redirectSignOut = signOutURI[2]
  }  else if (window.location.hostname === 'turefri.com'
  ) {
    config.oauth.redirectSignIn = signInURI[1]
    config.oauth.redirectSignOut = signOutURI[1]
  }
  else {
    console.error('This is not possible')
  }
Amplify.configure(config);
// Router configuration
const router = createBrowserRouter([
    {
        path: "",
        element: (
            <UserContextProvider>
            <GlobalProvider>
                <Suspense fallback={null}>
                    <RootComponent />
                </Suspense>
            </GlobalProvider>
            </UserContextProvider>
        ),
        errorElement: (
            <Suspense fallback={null}>
                <ErrorPage />
            </Suspense>
        ),
        children: [
            {
                path: "/",
                element: (
                    <Suspense fallback={null}>
                        <DetailMagnetProvider>
                            <TuRefri />
                        </DetailMagnetProvider>
                    </Suspense>
                ),
            },
            {
                path: "auth/login",
                element: (
                    <Suspense fallback={null}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: "auth/signup",
                element: (
                    <Suspense fallback={null}>
                        <SignUp />
                    </Suspense>
                ),
            },
            {
                path: "auth/confirm-code",
                element: (
                    <Suspense fallback={null}>
                        <ConfirmCode />
                    </Suspense>
                ),
            },
            {
                path: "auth/reset-password",
                element: (
                    <Suspense fallback={null}>
                        <ResetPasswordPage />
                    </Suspense>
                ),
            },
            {
                path: "profile",
                element: (
                    <Suspense fallback={null}>
                        <Profile />
                    </Suspense>
                ),
            },
            {
                path: "user-profile",
                element: (
                    <Suspense fallback={null}>
                        <UserProfile />
                    </Suspense>
                ),
            },
            {
                path: "location/:id",
                element: (
                    <Suspense fallback={null}>
                        <LocationPage />
                    </Suspense>
                ),
            },
            {
                path: "map",
                element: (
                        <Map />
                ),
            },
            {
                path: "events",
                element: (
                    <Suspense fallback={null}>
                        <Events />
                    </Suspense>
                ),
            },
            {
                path: "emergency",
                element: (
                    <Suspense fallback={null}>
                        <Emergency />
                    </Suspense>
                ),
            },
            {
                path: "contact",
                element: (
                    <Suspense fallback={null}>
                        <Contact />
                    </Suspense>
                ),
            },
            {
                path: "scan",
                element: (
                    <Suspense fallback={null}>
                        <Scan />
                    </Suspense>
                ),
            },
        ],
    },
]);

// Root render
let root: Root | null = null;
const rootElement = document.getElementById("root");

if (rootElement) {
    if (!root) {
        root = createRoot(rootElement);
    }
    root.render(
        <FridgeProvider>
            <RouterProvider router={router} />
            <Toaster />
        </FridgeProvider>
    );
} else {
    console.error("Element with ID 'root' not found");
}