import '@mantine/core/styles.css';
import { Box, MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import Footer from './components/Footer/Footer';
import { Calendar } from './pages/Calendar';
import classes from "./App.module.css"


const ApplicationLayout = () => {
  console.log(classes)
  return(
    <div className={classes["page-container"]} >
      <Navigation />
      <div className={classes["content-wrap"]} >
        <Outlet />
      </div>
    <Footer />
    </div>
  )
}

const routes = createBrowserRouter([
  {
    path: '/RecipePlanner/',
    element: <ApplicationLayout />,
    children: [
      {
        path: 'Meals/',
        element: <>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        test <br/>
        
        </>
      },
      {
        path: 'Calendar/',
        element: <Calendar />
      },
      {
        path: 'Pantry/',
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
