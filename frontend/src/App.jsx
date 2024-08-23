import {createBrowserRouter ,Navigate,RouterProvider} from 'react-router-dom'
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authUser'
import Layout from './components/Layout'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import History from './pages/History'
import Watch from './pages/Watch'
import SearchPage from './pages/Search'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const {user,isCheckingAuth,checkAuth} = useAuthStore()
 useEffect(()=>{
   checkAuth()
 },[checkAuth])

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout />,
    children:[{
      path:'/',
      element:<Home />
    },{
      path:'/history',
      element:user? <History /> : <Navigate to={'/login'} />
    },{
      path:'/watch/:id',
      element:user? <Watch /> : <Navigate to={'/login'} />
    },{
      path:'/search',
      element:user? <SearchPage /> : <Navigate to={'/login'} />
    }]
  },{
    path:'/signup',
    element:!user? <SignUp /> : <Navigate to={'/'}/>
  },{
    path:'/login',
    element:!user? <Login /> : <Navigate to={'/'}/>
  },{
    path:'/*',
    element:<NotFoundPage />
  }
])

if (isCheckingAuth) {
  return (
    <div className='h-screen'>
      <div className='flex justify-center items-center bg-black h-full'>
        <Loader className='animate-spin text-red-600 size-10' />
      </div>
    </div>
  );
}

  return (
    <>
     <div className="App">
       <RouterProvider router={router} />
     </div>
     <Toaster />
   </>
  )
}

export default App
