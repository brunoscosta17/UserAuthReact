import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppRoutes from './AppRoutes'
import { useAuth } from './auth'
import Header from './components/Header'

export default function App() {
  const { user } = useAuth()

  return (
    <>
      {user && <Header />}
      <AppRoutes />
      <ToastContainer />
    </>
  )
}
