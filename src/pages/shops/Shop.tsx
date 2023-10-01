import { Outlet, useNavigate } from "react-router-dom"
import SaleCarousel from "./ProductSales/ProductSale"
import "./shop.scss"
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { StoreType } from "@/stores";
interface Categories {
    id: string;
    avatar: string;
    title: string
}

export default function Shop() {
    const { t } = useTranslation();
    const categoryStore = useSelector((store : StoreType) => store.categoryStore );
    console.log("categoryStore",categoryStore);
    const navigate = useNavigate()
    
  return (
    <div className='shop'>
        <div className='shop-banner'>
            <img src="/images/title.webp" alt="" />
            <p className="banner-title">
                <h3>{t("newtl")}</h3>
                <p>​{t("new_content")}</p>
            </p>
        </div>
        <div className="shop-sale">
         <SaleCarousel/>
        </div>
        <div className="shop-content">
            <div className="content-left">
            <h4 className="categories-title">{t("listCategory")}</h4>
                <div className="left-chirld">
                  
                    {
                        categoryStore?.data?.map((category : Categories) =>   <h4 key={Math.random() * Date.now()} onClick={()=> navigate(`/shop/${category.id}`)}><img className="arow-icon" src="/images/icons.png"/> {category.title} </h4>)
                    }
                   
                </div>
                <div className="left-video">
                    <video className="video" playsInline={true} muted={true} loop={true} autoPlay={true} >
                        <source src="/videos/shop.mp4" type="video/mp4"/>
                    </video>
                </div>
            </div>
            <div className="content-right">
                <Outlet/>
            </div>

        </div>
    </div>
  )
}
