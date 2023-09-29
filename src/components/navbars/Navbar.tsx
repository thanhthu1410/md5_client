import React, { useEffect, useState } from 'react'
import "./navbar.scss"
import Search from '../search/Search'
import Cart from '../carts/Cart'
import Dropdown from '../dropdown/DropDown'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import store, { StoreType } from '../../stores'
import { useSelector } from 'react-redux'

export default function Navbar() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const[lang,setLang] = useState(localStorage.getItem("locales") == "en" ? "EN" : "VN")
    function handleChangeLanguage(language:string){
      localStorage.setItem("locales", language);
      window.location.href = "/"
    }
    const userStore = useSelector((store: StoreType)  => store.userStore)

  
    return (
        <div className='container-nav'>
            <div className='nav-top'>
                {userStore.data ?<p>{t("hello")} {userStore.data.user_name} !</p> : <p>{t("hello")}  !</p>}
                
                <p>carosel nek</p>
                <p className='nav-top-right'> 
                <span>{t("find")}</span>
                <select name="" id="" onChange={(e)=> handleChangeLanguage(e.target.value)}>
                    <option value="">Language</option>
                    <option value="vi">VN</option>
                    <option value="en">EN</option>
                   
                </select>
               
                </p>
            </div>
            <div className='nav-bt'>
                <div className='logo'><img src="https://media.istockphoto.com/id/1290057225/vector/house-icon-and-interior-design-with-lamp-drawer-shelf-home-furniture-illustration-stock.jpg?s=612x612&w=0&k=20&c=5XylIIzgjxIOj4WaPLY994Vdwa_FHGyQhvLUxLwUjy4=" alt="" /></div>
                <div className='nav-title'>
                    <p onClick={()=>navigate("/")}>{t('home')}</p>
                    <p onClick={()=>navigate("/shop/1")}>{t('shop')}</p>
                    <p onClick={()=>navigate("/")}>{t('new')}</p>
                 
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
