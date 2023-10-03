
import { useEffect, useState } from 'react';
import RouteSetup from './routes/RouteSetup';
import api from './services/api';
import { useDispatch, useSelector } from "react-redux";
import { userAction } from './stores/slice/user';
import { Modal } from 'antd';
import ChatBox from './components/chatbox/ChatBox';
import { categoryAction } from './stores/slice/categories';
import { productAction } from './stores/slice/product';
import { StoreType } from './stores';

export default function App() {
  const dispatch = useDispatch();
  const [openChat, setOpenChat] = useState(false);

  const productStore = useSelector((store: StoreType) => store.productStore)
  useEffect(()=>{
    if(localStorage.getItem("token")){
      api.users.authencation()
      .then(res => {
       
        if(res.status == 200){
            dispatch(userAction.setLoginData(res.data.data))
        }
        if (res.status == 213) {
          localStorage.removeItem("token");
        //  window.location.href = "/"
        }
      })
      .catch(err => console.log("err",err))
    }
    
  },[])

  useEffect(()=>{
    api.categories.findMany()
    .then(res => {
      if(res.status == 200){
          dispatch(categoryAction.setData(res.data.data))
      }
    })
  },[])
  useEffect(()=>{
    api.product.findMany()
    .then(res => {
    
      if(res.status == 200){
          dispatch(productAction.setData(res.data.data))
      }
    })
  },[productStore.reLoad])
  
  return (
    <div>
       {
        openChat == false 
        ? <button style={{position: "fixed", right: "50px", bottom: "50px"}} className="btn-94" onClick={() => {
          Modal.confirm({
            content: "Open Chat Box with your Account ?",
            onOk: () => {
              setOpenChat(true)
            }
          })
        }}>
        <svg viewBox="0 0 512 512">
        <path
          d="M309.333,341.333c29.419,0,53.333-23.936,53.333-53.333V96c0-29.397-23.915-53.333-53.333-53.333h-256
            C23.915,42.667,0,66.603,0,96v192c0,29.397,23.915,53.333,53.333,53.333h32v53.333c0,4.032,2.283,7.723,5.888,9.536
            c1.493,0.747,3.136,1.131,4.779,1.131c2.261,0,4.523-0.725,6.4-2.133l82.496-61.867H309.333z"
        ></path>
        <path
          d="M458.667,106.667h-64c-5.888,0-10.667,4.779-10.667,10.667V288c0,41.173-33.493,74.667-74.667,74.667H195.563
            c-2.304,0-4.565,0.747-6.4,2.133l-17.685,13.269c-2.731,2.048-4.309,5.248-4.267,8.64c0.043,3.392,1.685,6.571,4.459,8.555
            c9.173,6.592,19.904,10.069,30.997,10.069h124.437L409.6,467.2c1.877,1.408,4.117,2.133,6.4,2.133
            c1.621,0,3.264-0.384,4.779-1.131c3.605-1.813,5.888-5.504,5.888-9.536v-53.333h32C488.085,405.333,512,381.397,512,352V160
            C512,130.603,488.085,106.667,458.667,106.667z"
        ></path>
    </svg>
</button>
        : <div style={{width: "400px", position: "fixed", right: 0, bottom: 0, zIndex: 999}}>
          <ChatBox open={openChat} setOpenChat={setOpenChat}/>
        </div>
      }
      
       {/* {
        openChat == false 
        ?  <button onClick={() => {
          Modal.confirm({
            content: "Mở khung chat với tài khoản của bạn?",
            onOk: () => {
              setOpenChat(true)
            }
          })
        }} style={{position: "fixed", right: "50px", bottom: "50px"}}>Open Chat</button>
        : <div style={{width: "400px", position: "fixed", right: 0, bottom: 0}}>
          <ChatBox open={openChat}/>
        </div>
      } */}
      <RouteSetup/>
    </div>
  )
}
