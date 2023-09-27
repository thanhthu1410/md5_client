
import Lazy from '@/utils/lazies/Lazy'
import { Route } from 'react-router-dom'
export default

  <>
    <Route path="/admin" element={Lazy(() => import("@pages/admins/Admin"))()}>
      <Route index element={Lazy(() => import("@pages/admins/products/AdminProduct"))()}></Route>
      <Route path="/admin/categories" element={Lazy(() => import("@pages/admins/categories/AdminCategory"))()}></Route>
      <Route path="/admin/addProduct" element={Lazy(() => import("@pages/admins/addproducts/AddProduct"))()}></Route>
      <Route path="/admin/receipt" element={Lazy(() => import("@pages/admins/Orders/Order"))()}></Route>
      <Route path="/admin/receipt/:orderId" element={Lazy(() => import("@pages/admins/orderDetails/OrderDetail"))()}></Route>
      <Route path="/admin/user-receipt" element={Lazy(() => import("@pages/admins/userOrders/UserOrder"))()}></Route>
    </Route>
  </>


