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
                {userStore.data ?<p>{t("hello")} {userStore.data?.user_name} !</p> : <p>{t("hello")}  !</p>}
                
              
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
                <select name="" id="" onChange={(e)=> handleChangeLanguage(e.target.value)}>
                    <option value="">{t("language")}</option>
                    <option value="vi">VN</option>
                    <option value="en">EN</option>
                   
                </select>
               
                </p>
            </div>
            <div className='nav-bt'>
                <div className='logo'><img src="https://firebasestorage.googleapis.com/v0/b/md05furniturestore.appspot.com/o/test%2Flogo.png?alt=media&token=0906f3f7-8eb1-4113-af95-e6ca135af6da&_gl=1*yw45s0*_ga*MTg1ODg5NjEyOS4xNjg4MDg4OTU3*_ga_CW55HF8NVT*MTY5NjA2Nzk2NC40OC4xLjE2OTYwNjk1MDYuNTMuMC4w" alt="" /></div>
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
