import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Services from './pages/Services';
import AdminPanel from './admin/AdminPanel';
import AccountOperation from './admin/account/AccountOperation';
import EmployeeOperation from './admin/employee/EmployeeOperation';
import PostOperation from './admin/post/PostOperation';
import ServiceOperation from './admin/service/ServiceOperation';
import PrivateRoute from './components/PrivateRoute'; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/contact", element: <Contact /> },
      { path: "/services", element: <Services /> }
    ],
  },
  {
    element: <PrivateRoute />, 
    children: [
      {
        path: "/admin",
        element: <AdminPanel />,
        children: [
          { path: "account", element: <AccountOperation /> },
          { path: "employee", element: <EmployeeOperation /> },
          { path: "post", element: <PostOperation /> },
          { path: "service", element: <ServiceOperation /> },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
