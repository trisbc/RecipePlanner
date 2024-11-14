import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation';

export default {
  title: 'Nav',
};

export const Nav = () => (
  <BrowserRouter>
    <Navigation />
  </BrowserRouter>
);
