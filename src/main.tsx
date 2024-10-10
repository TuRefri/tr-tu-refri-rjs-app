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
            element: <> </>, 
        },
        {
            path: "turefri",
            element: <> </>, 
        },
        {
            path: "turefri/:tienda",
            element: <> </>, 
        },
        {
            path: "buscar-tienda",
            element: <> </>, 
        },
        {
            path: "eventos",
            element: <> </>, 
        },
        {
            path: "emergencias",
            element: <> </>, 
        },
        {
            path: "contacto",
            element: <> </>, 
        },
        {
            path: "scanear-tienda",
            element: <> </>, 
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



