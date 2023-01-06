import { createBrowserRouter } from 'react-router-dom';
import { Home, NotFound, Cart } from './pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
]);