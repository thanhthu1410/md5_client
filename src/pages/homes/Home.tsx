import "./home.scss"
import Navbar from '../../components/navbars/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/footers/Footer'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { StoreType } from "@/stores";
import { Socket, io } from "socket.io-client";
import { Receipt, User, userAction } from "@/stores/slice/user";
import { Modal, message } from "antd";

export default function Home() {
  const dispatch = useDispatch();
  const userStore = useSelector((store: StoreType) => store.userStore)

  useEffect(() => {
    if (!userStore.data) {
      let token = localStorage.getItem("token");
      if (token) {
        let socket: Socket = io("http://localhost:3001", {
          query: {
            token
          }
        })
        socket.on("connectStatus", (data: { status: boolean, message: string }) => {
          console.log(data.message)
        })
        socket.on("disconnect", () => {
          dispatch(userAction.setLoginData(null))
        })
        socket.on("receiveUserData", (user: User) => {
          dispatch(userAction.setLoginData(user))
        })
        socket.on("receiveReceipt", (receipts: Receipt[]) => {
          console.log("receipt", receipts);

          dispatch(userAction.setReceipt(receipts))
        })

        socket.on("receiveCart", (cart: Receipt) => {
          dispatch(userAction.setCart(cart))
        })
        dispatch(userAction.setSocket(socket))
      }

    }
  }, [userStore.reLoad])
  useEffect(() => {
    if (!userStore.data) {
      let token = localStorage.getItem("token");
      if (token) {
        let socket: Socket = io("http://localhost:3001", {
          query: {
            token
          }
        })
        socket.on("connectStatus", (data: { status: boolean, message: string }) => {
          console.log(data.message)
        })
        socket.on("disconnect", () => {
          dispatch(userAction.setLoginData(null))
        })
        socket.on("receiveUserData", (user: User) => {
                    console.log("userStore",user);
          dispatch(userAction.setLoginData(user))

          
        })
        socket.on("receiveReceipt", (receipts: Receipt[]) => {
          dispatch(userAction.setReceipt(receipts))
        })

        socket.on("receiveCart", (cart: Receipt) => {
          dispatch(userAction.setCart(cart))
        })

        socket.on("cash-status", (status: boolean) => {
          if (status) {
            Modal.success({
              title: "Payment Successfull !",
        
              onOk: () => {
                console.log("đã vào!")
                window.location.href= "/thankyou"
              }
            })
            message.success("Payment Successfull !")
            setTimeout(() => {
              
            }, 1500)
          }
        })

        socket.on("payQr", (url: string | null) => {
          dispatch(userAction.setCartPayQr(url))
          if (!url) {
            Modal.confirm({
              title: "Thanh toán thất bại",
              content: "Bạn có muốn thanh toán lại không?",
              onOk: () => {
                console.log("payzalo",userStore);
                // null ngay đây . mặc dù dã đăng nhập thao tác bình thường
                socket.emit("payZalo", {
                  receiptId: userStore.cart?.id,
                  userId:userStore.data?.id
                })
              }
            })
          }
        })

        dispatch(userAction.setSocket(socket))
      }

    }
  }, [userStore.reLoad])
  useEffect(() => {
    userStore.socket?.on("connectStatus", (data: { status: boolean, message: string }) => {
      if (data.status) {
        console.log(data.message)

      } else {
        console.log(data.message)
      }
    })
    console.log("userStore", userStore);

  }, [userStore.socket])
  return (
    <div className='home-page'>
      <div className="home-page-content">
        <Navbar />
        <div className='body-content'>
          <Outlet />

        </div>
        <Footer />
      </div>
    </div>
  )
}
