import { BrowserRouter } from 'react-router-dom';
import Componenet from './Settings';

export default {
  title: 'Nav/Settings',
};

export const Settings = () => (
  <BrowserRouter>
    <Componenet />
  </BrowserRouter>
);
