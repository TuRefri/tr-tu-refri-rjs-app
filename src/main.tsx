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
import RootComponent from './routes/root';
import TuRefri from './routes/turefri';
import ErrorPage from './error-page';
import Map from './routes/map.tsx';
import Emergency from './routes/emergency.tsx';
import Contact from './routes/contact.tsx';
import Scan from './routes/scan.tsx';
import Events from './routes/events.tsx';
import Profile from './routes/profile.tsx';
import Login from './routes/login.tsx';
import SignUp from './routes/signup.tsx';
import UserProfile from './routes/user-profile.tsx';
import ConfirmCode from './routes/confirm-code.tsx';
import ResetPasswordPage from './routes/reset-password.tsx';
import { registerSW } from 'virtual:pwa-register'
import LocationPage from './components/LocationPage.tsx';

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
            <GlobalProvider>
                <RootComponent />
            </GlobalProvider>
        ),
        errorElement: <ErrorPage />,
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
                element: <Login />,
            },
            {
                path: "auth/signup",
                element: <SignUp />,
            },
            {
                path: "auth/confirm-code",
                element: <ConfirmCode />,
            },
            {
                path: "auth/reset-password",
                element: <ResetPasswordPage />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "user-profile",
                element: <UserProfile />,
            },
/*             {
                path: "stores",
                element: (
                    <StorePageProvider>
                        <StorePage />
                    </StorePageProvider>
                ),
            }, */
            {
                path: "location/:id",
                element: <LocationPage />,
            },
            {
                path: "map",
                element: <Map />,
            },
            {
                path: "events",
                element: <Events />,
            },
            {
                path: "emergency",
                element: <Emergency />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
            {
                path: "scan",
                element: <Scan />,
            },
        ],
    },
]);

// Use a variable to hold the root instance
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
