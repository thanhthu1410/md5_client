
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/homes/Home'
import Layout from '../pages/homes/components/Layout'
import RouteShop from './RouteShop'
import Product from '../pages/products/Product'
import About from '../pages/abouts/About'
import ProfilePage from '../pages/userProfiles/UserProfile'
import RouteAdmin from './RouteAdmin'

export default function RouteSetup() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>}>
           <Route index element={<Layout />}></Route>
           <Route path='/about' element={<About/>}></Route>
           <Route path='/product/:id' element={<Product/>}></Route>
           <Route path='/userprofile' element={<ProfilePage/>}></Route>
           {RouteShop}
          
        </Route>
        {RouteAdmin}
        </Routes>
    </BrowserRouter>
  )

}