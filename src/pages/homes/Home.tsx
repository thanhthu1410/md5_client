import "./home.scss"
import Navbar from '../../components/navbars/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/footers/Footer'


export default function Home() {
  return (
    <div className='home-page'>
      <div className="home-page-content">
        <Navbar />
        <div className='body-content'>
          <Outlet />
          
        </div>
        <Footer />
      </div>
    </div>
  )
}
