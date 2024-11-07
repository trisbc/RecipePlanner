import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { ColorSchemeToggle } from './components/ColorSchemeToggle/ColorSchemeToggle';
import Footer from './components/Footer/Footer';



const ApplicationLayout = () => (
  <>
    <Navigation />
    <main>
      <Outlet />
    </main>
   <Footer />
  </>
)

const routes = createBrowserRouter([
  {
    path: '/RecipePlanner/',
    element: <ApplicationLayout />,
    children: [
      {
        path: 'Meals/',
        element: <></>
      },
      {
        path: 'Calendar/',
        element: <></>
      },
      {
        path: 'Inventory/',
        element: <></>
      }
    ]
  }
]);

const Router = () => {
  return <RouterProvider router={routes} />;
}

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Router />
    </MantineProvider>
  );
}
