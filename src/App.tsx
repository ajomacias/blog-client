import { RouterProvider } from 'react-router-dom'
import { requestInterceptor } from './interceptor/requests';
import AuthProvider from './providers/AuthProvider';
import router from './router'

requestInterceptor();

function App() {

  return (
    <AuthProvider>
    <RouterProvider router={router}  />
    </AuthProvider>
  )
}

export default App
