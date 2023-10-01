
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/homes/Home'
import Layout from '../pages/homes/components/Layout'
import RouteShop from './RouteShop'
import Product from '../pages/products/Product'
import About from '../pages/abouts/About'
import ProfilePage from '../pages/userProfiles/UserProfile'
import RouteAdmin from './RouteAdmin'
import Lazy from '@/utils/lazies/Lazy'
import Contact from '@/pages/contacts/Contact'
import Receipt from '@/pages/receipts/Receipt'
import UserReceipt from '@/pages/receipts/UserReceipt'
import Thankyou from '@pages/checkouts/Thankyou'

export default function RouteSetup() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>}>
           <Route index element={<Layout />}></Route>
           <Route path='/about' element={<About/>}></Route>
           <Route path='/contact' element={<Contact/>}></Route>
           <Route path='/receipt' element={<Receipt/>}></Route>
           <Route path='/user-receipt' element={<UserReceipt/>}></Route>
           <Route path='/thankyou' element={<Thankyou/>}></Route>
           <Route path='/product/:id' element={Lazy(() => import("@pages/products/Product"))()}></Route>
           {/* <Route path='/product/:id' element={<Product/>}></Route> */}
           <Route path='/userprofile' element={<ProfilePage/>}></Route>
           <Route path='/checkout' element={Lazy(()=> import("@pages/checkouts/CheckOut"))()}></Route>
           <Route path='/checkout' element={Lazy(()=> import("@pages/checkouts/Thankyou"))()}></Route>
           {RouteShop}
          
        </Route>
        {RouteAdmin}
        </Routes>
    </BrowserRouter>
  )

}