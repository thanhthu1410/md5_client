import React, { useEffect, useState } from 'react'
import "./navbar.scss"
import Search from '../search/Search'
import Cart from '../carts/Cart'
import Dropdown from '../dropdown/DropDown'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import store, { StoreType } from '../../stores'
import { useSelector } from 'react-redux'
import { Carousel } from 'antd'

export default function Navbar() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const[lang,setLang] = useState(localStorage.getItem("locales") == "en" ? "EN" : "VN")
    function handleChangeLanguage(language:string){
      localStorage.setItem("locales", language);
      window.location.href = "/"
    }
    const userStore = useSelector((store: StoreType)  => store.userStore)
    const [banners, setBanners] = useState([
        {
            id: 1,
            title: t("best_price")
        },
        {
            id: 2,
            title: t("new_content")
        },
        {
            id: 3,
            title: t("freeship")
        }
    ]);
    return (
        <div className='container-nav'>
            <div className='nav-top'>
                {userStore.data ?<p className='nav-top-left'>{t("hello")} {userStore.data?.user_name} !</p> : <p className='nav-top-left'>{t("hello")}  !</p>}
                
              
                <p className='carousel-container'>
                <Carousel
                    autoplay
                    autoplaySpeed={2000}
                    effect={"fade"}
                    dots={false}
                    dotPosition={"bottom"}
                >
                    {banners.map((banner, index) => (
                        <div className="items" key={banner.id + index}>
                            <p className='title'>{banner.title}</p>
                        </div>
                    ))}
                </Carousel>
              
            </p>
               
                <p className='nav-top-right'> 
                <span>{t("find")}</span>
                <select name="" id="" className='selectLanguage' onChange={(e)=> handleChangeLanguage(e.target.value)}>
                    <option value="">{t("language")}</option>
                    <option value="vi">VN</option>
                    <option value="en">EN</option>
                   
                </select>
               
                </p>
            </div>
            <div className='nav-bt'>
                <div className='logo'><img src="https://firebasestorage.googleapis.com/v0/b/md05furniturestore.appspot.com/o/test%2Flogo1.jpg?alt=media&token=9a98413d-b9d9-4506-bd3c-a414046dcf06&_gl=1*1ewf5zf*_ga*MTg1ODg5NjEyOS4xNjg4MDg4OTU3*_ga_CW55HF8NVT*MTY5NjMwMzMyMC41My4xLjE2OTYzMDM0OTQuNTEuMC4w" alt="" /></div>
                <div className='nav-title'>
                    <p onClick={()=>navigate("/")}>{t('home')}</p>
                    <p onClick={()=>navigate("/shop/1")}>{t('shop')}</p>
                    <p onClick={()=>navigate("/contact")}>{t('contact')}</p>
                 
                    <p onClick={()=>navigate("/about")}>{t('abouts')}</p>
                </div>
                <div className='nav-icon'>
                    <Search/>
                    <Cart/>
                   <Dropdown />
                </div>
            </div>
        </div>
    )
}
