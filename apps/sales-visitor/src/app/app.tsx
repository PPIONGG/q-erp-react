import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@q-erp-react/auth';
import { router } from '../routes';
import './../styles/global.css';

export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </AuthProvider>
  );
}
