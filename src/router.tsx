import { createBrowserRouter, Route } from 'react-router-dom';
import authRouter from './feature/auth/authRouter';
import Layout from './layout/Layout';
import layoutRoutes from './layout/layout.routes';


const router = createBrowserRouter([
    {
        path : '/auth',
        children : authRouter, 
    },
    {
        path : '',
        element : <Layout />,
        children : layoutRoutes
    }
    
],

)
if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
  }
  
export default router;