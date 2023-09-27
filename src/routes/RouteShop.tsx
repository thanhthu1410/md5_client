import { Route } from "react-router-dom";
import Shop from "../pages/shops/Shop";
import Shopdetail from "../pages/shops/shopDetails/Shopdetail";

export default 
    <>
        <Route path="/shop" element={<Shop/>}>
               
                <Route path="/shop/:id" element={<Shopdetail/>}></Route>
        </Route>
    </>