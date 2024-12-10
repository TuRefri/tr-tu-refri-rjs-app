import { lazy, Suspense } from 'react';
import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Toaster } from 'sonner';
import './index.css';
import { FridgeProvider } from './context/fridge-color-context.tsx';
import { DetailMagnetProvider } from './context/detail-magnet-context.tsx';
import { StorePageProvider } from './context/store-page-context.tsx';
import { GlobalProvider } from './context/global-context.tsx';
import SuspenseComponent from './components/suspense/SuspenseComponent.tsx';
// Lazy load components
const Root = lazy(() => import('./routes/root'));
const TuRefri = lazy(() => import('./routes/turefri'));
const ErrorPage = lazy(() => import('./error-page'));
const Map = lazy(() => import('./routes/map.tsx'));
const Emergency = lazy(() => import('./routes/emergency.tsx'));
const Contact = lazy(() => import('./routes/contact.tsx'));
const Scan = lazy(() => import('./routes/scan.tsx'));
const Events = lazy(() => import('./routes/events.tsx'));
const Profile = lazy(() => import('./routes/profile.tsx'));
const StorePage = lazy(() => import('./routes/stores.tsx'));
const Login = lazy(() => import('./routes/login.tsx'));
const SignUp = lazy(() => import('./routes/signup.tsx'));
const UserProfile = lazy(() => import('./routes/user-profile.tsx'));
const ConfirmCode = lazy(() => import('./routes/confirm-code.tsx'));
const ResetPasswordPage = lazy(() => import('./routes/reset-password.tsx'));

// Configure Amplify
Amplify.configure(config);
const router = createBrowserRouter([
    {
        path: "",
        element: (
            <GlobalProvider>
                   <Suspense fallback={<SuspenseComponent />}>
                        <Root />
                    </Suspense>
            </GlobalProvider>
        ),
        errorElement: (
                <ErrorPage />
        ),
        children: [
            {
                path: "/",
                element: (
                    <DetailMagnetProvider>
                            <TuRefri />
                    </DetailMagnetProvider>
                ),
            },
            {
                path: "auth/login",
                element: (
                        <Login />
                ),
            },
            {
                path: "auth/signup",
                element: (
                        <SignUp />
                ),
            },
            {
                path: "auth/confirm-code",
                element: (
                        <ConfirmCode />
                ),
            },
            {
                path: "auth/reset-password",
                element: (
                        <ResetPasswordPage />
                ),
            },
            {
                path: "profile",
                element: (
                        <Profile />
                ),
            },
            {
                path: "user-profile",
                element: (
                        <UserProfile />
                ),
            },
            {
                path: "stores",
                element: (
                    <StorePageProvider>
                            <StorePage />
                    </StorePageProvider>
                ),
            },
            {
                path: "stores/:id",
                element: (
                        <StorePage />
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
                        <Events />
                ),
            },
            {
                path: "emergency",
                element: (
                        <Emergency />
                ),
            },
            {
                path: "contact",
                element: (
                        <Contact />
                ),
            },
            {
                path: "scan",
                element: (
                        <Scan />
                ),
            },
        ],
    },
]);

const rootElement = document.getElementById("root");

if (rootElement) {
    createRoot(rootElement).render(
        <FridgeProvider>
            <RouterProvider router={router} />
            <Toaster />
        </FridgeProvider>
    );
} else {
    console.error("Element with ID 'root' not found");
}
