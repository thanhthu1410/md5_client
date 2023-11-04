import React, { useState, useEffect } from 'react'
import "./checkout.scss"
import api from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { Modal, QRCode, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import { ReceiptDetail } from '@/stores/slice/user';
import axios from 'axios';
import { CartItemType, guestCartActions } from '@/stores/slice/guestCart.slice';
interface Product {
  id: string;
  name: string;
  avatar: string;
  price: number;
  des: string;
  categoryId: string;
  productPictures: {
    id: string;
    path: string;
  }[]
}
interface CartItem {
  productId: string;
  quantity: number;
}
interface CartItemDetail extends CartItem {
  productDetail: Product
}

interface newGuestReceipt {
  email: string;
  phoneNumber: string;
  total: number;
  payMode: string;
}
interface NewUserReceipt {
  phoneNumber: string;
  total: number;
  payMode: string;
  address: string;
}

export default function CheckOut() {
  const [loading, setLoading] = useState(false);
  const userStore = useSelector((store: StoreType) => {
    return store.userStore
  })
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const guestCartStore = useSelector((store : StoreType) => store.guestCartStore)
  const [cart, setCart] = useState<CartItemDetail[]>([]);
  function handleOrder(e: any) {
    setLoading(true);
    e.preventDefault();
    /* guest */
    if (e.target.name.value == "" || e.target.email.value == "" || e.target.phoneNumber.value == "" || e.target.address.value == "") {
      message.warning("Please enter full fill your billing address !")
      setLoading(false)
      
    }
    let payMode = e.target.payMode.value;
    let guest = {
      name: (e.target as any).name.value,
      numberPhone: (e.target as any).phoneNumber.value,
      email: (e.target as any).email.value
    }
    console.log("guest",guest);
    
    /* guest */
 
    
      if (payMode == "") {
        message.error('Please Choose Paymode !')
      }
      console.log("paymode", payMode);
      if(userStore.socket){
        if (payMode == "CASH") {
          userStore.socket?.emit("payCash", {
            receiptId: userStore.cart?.id,
            userId: userStore.data?.id,
            total: subTotal
          })
          message.success("Oder Successfull");
          navigate("/thankyou")
        }
  
        if (payMode == "ZALO") {
          userStore.socket?.emit("payZalo", {
            receiptId: userStore.cart?.id,
            userId: userStore.data?.id,
            total: subTotal
          })
        }
      }else {
       
        
        let carFormat = guestCartStore.cart?.map((item) => {
          return {
            optionId: item.option.id,
            quantity: item.quantity
          }
        })

        let body = {
          guest,
          receiptDetails: carFormat,
          payMode,
          total: guestCartStore.cart?.reduce((total, item) => {
            return total + item.quantity * item.option.product.price
          }, 0)
        }

        console.log("body", body)
       
        axios.post("http://127.0.0.1:3000/api/v1/guest", body)
        .then((res) => {
          if(res.status == 200) {
            Modal.success({
              title: "Oder Successfull !",
              content: "You can review the order history on the purchase history page",
              onOk: () => {
                dispatch(guestCartActions.setCart([]))
                localStorage.setItem("cart", "[]"),
                navigate("/thankyou")
              }
            })
          }else {
            alert("Lỗi")
          }
        })
        .catch(err => {
          console.log("err", err)
          alert("Lỗi")
        })
      }
      setLoading(false)

    


  }

  const totalProduct = userStore.cart?.detail.reduce((value, cur) => {
    return value + cur.quantity
  }, 0)
  const subTotal = userStore.cart?.detail.reduce((value, current) => {
    return value + current.quantity * current.option.product.price
  }, 0)

  console.log("totalProduct", totalProduct);
  const gestSubtotal = guestCartStore.cart?.reduce((value, current) => {
    return value + current.quantity * current.option.product.price
  }, 0)


  useEffect(() => {
    console.log("userStore ", userStore);

  }, [userStore.data])
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return (

    <>
      <div className='checkout-container'>
        <div className="banner-container">
          <div className="bannerProducts"></div>
          <div className="bannerProducts-over"></div>
          <div className='title-banner'>
            <h2>Thank You For Choosing Us</h2>
            <p>Whether you have questions about our products, payments, delivery or returns, please don't hesitate to get in touch with us</p>
          </div>
        </div>
        {
          userStore.cartPayQr &&
          <div className='qrContainer'>
            <div className='qrContainer-chirld'>
              <img src="https://firebasestorage.googleapis.com/v0/b/md05furniturestore.appspot.com/o/test%2F1622682588188_zalopay.png?alt=media&token=c19747fb-58b0-4961-ba04-d0a9a9c7bdb1&_gl=1*1l56kpl*_ga*MTg1ODg5NjEyOS4xNjg4MDg4OTU3*_ga_CW55HF8NVT*MTY5NjI1NjY4NS41Mi4xLjE2OTYyNTY3NTUuNjAuMC4w" alt="" />
              <img className='logoQr' src="https://firebasestorage.googleapis.com/v0/b/md05furniturestore.appspot.com/o/test%2Flogo1.jpg?alt=media&token=9a98413d-b9d9-4506-bd3c-a414046dcf06&_gl=1*s62pxm*_ga*MTg1ODg5NjEyOS4xNjg4MDg4OTU3*_ga_CW55HF8NVT*MTY5NjMzMzUxNS41Ni4wLjE2OTYzMzM1MTUuNjAuMC4w" alt="" />
              <QRCode value={userStore.cartPayQr} icon='https://firebasestorage.googleapis.com/v0/b/md05furniturestore.appspot.com/o/test%2Flogo1.jpg?alt=media&token=9a98413d-b9d9-4506-bd3c-a414046dcf06&_gl=1*s62pxm*_ga*MTg1ODg5NjEyOS4xNjg4MDg4OTU3*_ga_CW55HF8NVT*MTY5NjMzMzUxNS41Ni4wLjE2OTYzMzM1MTUuNjAuMC4w' />
              <p>Awaiting payment.....</p>
              <h4>Scan to Pay</h4>
            </div>

          </div>
        }
        <div className="row-checkout">
          <div className="col-65">
            <div className="container-checkout">
              <form onSubmit={(e) => { handleOrder(e as any) }}>
                {/* Edit */}
                {
                  userStore.data == null ? <div className="row">
                    <h3>Billing Address</h3>
                    <div className="col-50">

                      <label htmlFor="fname">
                        <i className="fa fa-user" /> Full Name
                      </label>
                      <input
                        type="text"
                        id="fname"
                        name="name"
                        placeholder="nguyen van a "
                      />
                      <label htmlFor="email">
                        <i className="fa fa-envelope" /> Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="john@example.com"
                      />
                      <div className="col-50">
                        <label htmlFor="adr">
                          <i className="fa fa-address-card-o" /> Phone Number
                        </label>
                        <input
                          type="text"
                          id="adr"
                          name="phoneNumber"
                          placeholder="+ 84 999 999 999"
                        />
                        <label htmlFor="adr">
                          <i className="fa fa-address-card-o" /> Address
                        </label>
                        <input
                          type="text"
                          id="adr"
                          name="address"
                          placeholder="542 W. 15th Street"
                        />

                      </div>

                    </div>

                  </div>

                    :
                    <div>
                      <h3>Billing Address</h3>
                      <div className="col-50">

                        <label htmlFor="fname">
                          <i className="fa fa-user" /> Full Name
                        </label>
                        <input
                          type="text"
                          id="fname"
                          name="name"
                          placeholder="John M. Doe"
                        />
                        <label htmlFor="email">
                          <i className="fa fa-envelope" /> Email
                        </label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          placeholder="john@example.com"
                          value={userStore.data.email}
                        />

                        <label htmlFor="adr">
                          <i className="fas fa-phone me-3" /> Phone Number
                        </label>
                        <input
                          defaultValue={userStore.data.phone_number}
                          type="text"
                          id="adr"
                          name="phoneNumber"
                          placeholder="+ 84 999 999 999"
                        />
                        <label htmlFor="adr">
                          <i className="fas fa-home me-3" /> Address
                        </label>
                        <input
                          defaultValue={userStore.data.address}
                          type="text"
                          id="adr"
                          name="address"
                          placeholder="542 W. 15th Street"
                        />

                      </div>



                    </div>
                }
                {/* Edit */}
                <h3>Payment</h3>

                <div className='payment-container'>
                  <div className="icon-container">
                    <input name='payMode' type="radio" value="CASH" defaultChecked /> <span>CASH  </span><img src="https://www.vhv.rs/dpng/d/546-5464937_cash-payment-icon-cash-money-icon-png-transparent.png" alt="" />
                  </div>
                  <div className="icon-container">
                    <input name='payMode' type="radio" value="ZALO" /> <span>ZALO  </span><img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png" alt="" />
                  </div>

                </div>

                {/* {loading ? <button className='loading-button'><span className='loading-spinner'></span></button> : <input
                  type="submit"
                  defaultValue="Continue to checkout"
                  className="btn-checkout"
                />} */}
                <input
                  type="submit"
                  defaultValue="Continue to checkout"
                  className="btn-checkout"
                />
              </form>
            </div>
          </div>
          <div className="col-35">
            <div className="container-checkout">
              <h4>
                Cart{" "}


                <span className="price" style={{ color: "black" }}>
                  <i className="fa fa-shopping-cart" /> <b>{totalProduct}</b>
                </span>
              </h4>

              {  userStore.data !== null ?  userStore.cart?.detail.map((item: ReceiptDetail) => (
                <p className='item-cart-checkout'>
                  <span>{item.option.product.name}{`(${item.quantity})`}</span> <span>{formatter.format(Number(item.option.product.price))}</span>
                </p>
              ))
            :
            guestCartStore.cart?.map((item: CartItemType) => (
              <p className='item-cart-checkout'>
                <span>{item.option.product.name}{`(${item.quantity})`}</span> <span>{formatter.format(Number(item.option.product.price))}</span>
              </p>
            ))
            }


              <hr />
              <p>
                Total{" "}
                <span className="price" style={{ color: "black" }}>
                  <b>{ userStore.data !== null ?  formatter.format(Number(subTotal)) : formatter.format(Number(gestSubtotal))}</b>

                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

    </>

  )
}
