import {  useEffect, useState } from 'react';
import './dropdown.scss';
import {Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginMoldal from '../logins/ModalLogin';
import { Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import { userAction } from '@/stores/slice/user';


export default function Dropdown() {
    const { t } = useTranslation();
    const userStore = useSelector((store: StoreType)  => store.userStore)
    const dispatch = useDispatch()
   function hanldeLogOut(){
    localStorage.removeItem('token');
    userStore.socket?.disconnect()
 
   
   }
 
    
    return (
        <div className="dropdown">
            <button
                className="btn dropdown-toggle account-btn"
                type="button"
                id="dropdownMenuButton"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
            >
                <i className="fa fa-user" />
            </button>
            {!userStore.data ? <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">         
                <li>  
                       <LoginMoldal/>                   
                </li>
                <li>
                    <a className="dropdown-item" href='/admin'>
                    {t("purchaseHistory")}
                      
                    </a>
                </li> 
            </ul> :
               <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              
               <li>
               <Popconfirm
                        placement="bottomRight"
                        title={`Do you want to Logout ?`}
                     
                        onConfirm={() => {
                            hanldeLogOut()
                            
                
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                         <span  className="dropdown-item" >
                       {t("logout")}
                     
                   </span>
                         </Popconfirm>
                  
               </li>
               <li>
                   <Link className="dropdown-item" to={"/receipt"}>
                       {t("purchaseHistory")}
                   </Link>
               </li>
               <li>
                   <Link className="dropdown-item" to={"/userprofile"}>
                       {t("userProfile")}
                   </Link>
               </li>
              
               
           </ul>}
         

        
        </div>
    )
}