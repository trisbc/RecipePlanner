import { BrowserRouter } from 'react-router-dom';
import Componenet from './Settings';

export default {
  title: 'Nav',
};

export const Usage = () => (
  <BrowserRouter>
    <Componenet />
  </BrowserRouter>
);
