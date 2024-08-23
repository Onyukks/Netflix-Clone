import {Outlet} from 'react-router-dom'
import Footer from '../components/Footer'
const Layout = ()=>(
    <>
      <Outlet />
      <Footer />
    </>
  )

export default Layout