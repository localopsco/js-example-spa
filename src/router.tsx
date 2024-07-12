import { createBrowserRouter } from 'react-router-dom';
import Todos from './todos';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Todos />,
  },
]);

export default router;
