import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react'
import { ConfigProvider } from './Context/ConfigContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './Layout/AppLayout';
import routes from './Routes/routes';
import Page404 from './Layout/Page404';
import Login from './Pages/Auth/Login';
import ProtectedRoute from './Routes/protectedRoute';


const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);

    if (!decodedToken || !decodedToken.exp) {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error while validating token:', error);
    return false;
  }
};

const App = () => {

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "/assets/js/app.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const mRoutes = isTokenValid() ? [
    {
      element: <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>,
      errorElement: <Page404 />,
      children: routes,
    },
  ]
    : [
      { path: '/', element: <Login /> },
      { path: '*', element: <Login /> },
    ];

  const router = createBrowserRouter(mRoutes);

  return (
    <ConfigProvider>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
