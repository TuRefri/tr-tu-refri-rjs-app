import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import TuRefri from './routes/turefri';
import ErrorPage from "./error-page";
import './index.css';
import {FridgeProvider} from './context/fridge-color-context.tsx'
import Map from './routes/map.tsx';
import Emergency from './routes/emergency.tsx';
import Contact from './routes/contact.tsx';
import Scan from './routes/scan.tsx';
import Events from './routes/events.tsx';
import Profile from './routes/profile.tsx';
const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "turefri",
          element: <TuRefri />,
        },
        {
            path: "perfil",
            element: <Profile />, 
        },
        {
            path: "turefri/:tienda",
            element: <> </>, 
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
        </FridgeProvider>
    );
} else {
    console.error("Element with ID 'root' not found");
}



