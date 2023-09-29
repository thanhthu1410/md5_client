import { Route } from "react-router-dom";
import Shop from "../pages/shops/Shop";
import Shopdetail from "../pages/shops/shopDetails/Shopdetail";
import Lazy from '@/utils/lazies/Lazy'

export default 
    <>
  
        <Route path="/shop"element={Lazy(() => import("@pages/shops/Shop"))()}>
                <Route path="/shop/:id" element={Lazy(() => import("@pages/shops/shopDetails/Shopdetail"))()}></Route>
        </Route>
    </>