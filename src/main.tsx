import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json'; // Ruta a tu archivo de configuración
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Toaster } from 'sonner';
import Root from "./routes/root";
import TuRefri from './routes/turefri';
import ErrorPage from "./error-page";
import './index.css';
import { FridgeProvider } from './context/fridge-color-context.tsx';
import Map from './routes/map.tsx';
import Emergency from './routes/emergency.tsx';
import Contact from './routes/contact.tsx';
import Scan from './routes/scan.tsx';
import Events from './routes/events.tsx';
import Profile from './routes/profile.tsx';
import StorePage from './routes/stores.tsx';
import Login from './routes/login.tsx';
import { DetailMagnetProvider } from './context/detail-magnet-context.tsx';
import { StorePageProvider } from './context/store-page-context.tsx';
import { GlobalProvider } from './context/global-context.tsx';
import SignUp from './routes/signup.tsx';
import UserProfile from './routes/user-profile.tsx';
/* import App from './components/App.tsx'; */

{/* <DetailMagnetProvider>
            <TuRefri />
          </DetailMagnetProvider> */}

// Configurar Amplify
Amplify.configure(config);

const router = createBrowserRouter([
    {
        path: "/",
        element: <GlobalProvider><Root /></GlobalProvider>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: 
                    <DetailMagnetProvider>
                        <TuRefri />
                    </DetailMagnetProvider>,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "user-profile",
                element: <UserProfile />,
            },
            {
                path: "stores",
                element: 
                <StorePageProvider>
                    <StorePage />
                </StorePageProvider>, 
            },
            {
                path: "stores/:id",
                element: <StorePage />, 
            },
            {
                path: "map",
                element: <Map />, 
            },
            {
                path: "events",
                element: <Events/>, 
            },
            {
                path: "emergency",
                element: <Emergency />, 
            },
            {
                path: "contact",
                element: <Contact/>, 
            },
            {
                path: "scan",
                element: <Scan/>, 
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
