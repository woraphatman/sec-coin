import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './auth/login';
import Error from './pages/error/index';
import Home from './pages/home';
import Register from './auth/register';


/** root routes */
const router = createBrowserRouter(
  [
    {
      path : '/',
      element : <Login/>
  },
  {
    path : '/register',
    element : <Register/>
  },
    {
        path : '/home',
        element : <Home/>
    },
    {
      path : '*',
      element : <Error/>
  },
    
   
])

export default function Route() {
  return (
    <main > 
          <RouterProvider router={router}></RouterProvider>
    </main>
  )
}
