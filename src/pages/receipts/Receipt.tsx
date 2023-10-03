

import { useEffect, useState } from 'react';
import './receipt.scss';
import api from '@/services/api';
import { useNavigate } from 'react-router-dom';
import OTPVerification from './otpVerify/OtpVerify';
import { message } from 'antd';
import axios from 'axios';
import { CartItemType } from '@/stores/slice/guestCart.slice';




interface OrderItem {
  payMode: string
  shipAt: string
  status: string
  total: number
  paid: boolean
  createAt: string
  id: string
}
interface Guest {
  email: string
  name: string
  numberPhone: string
}

interface OrderItemDetail extends OrderItem {
  detail: CartItemType[]
  guest: Guest
}

export default function Receipt() {
  const [loading, setLoading] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [products, setProducts] = useState<OrderItemDetail[]>([]);
  const [guestReceiptDetail, setGuestReceiptDetail] = useState<OrderItemDetail[]>([]);
  const [isShowOTP, setIsShowOTP] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [isShowReceipts, setIsShowReceipts] = useState(false);
  const navigate = useNavigate();
 
  function handleGetOtp() {
    setLoading(true);
    axios.get(`http://127.0.0.1:3000/api/v1/guest/?email=${emailInput}`)
      .then(res => {
        setLoading(false);
        if (res.status == 200) {
          console.log("res", res)
          message.success(res.data.message)
          setIsShowOTP(true);
          setIsShow(false);
        }
        console.log("đã vào đây", res.data)
      })
      .catch(err => {
        setLoading(false);
        console.log("lỗi", err)
      })

  }
  function handleGetReceipt(otp: string) {
    axios.get(`http://127.0.0.1:3000/api/v1/guest/?email=${emailInput}&otp=${otp}`)
      .then(res => {
        console.log("res", res)
        if (res.status == 200) {
          setIsShowOTP(false);
          setIsShowReceipts(true);
          console.log("setGuestReceiptDetail", res.data.data)
          setGuestReceiptDetail(res.data.data)
        }
      })
  }

  useEffect(() => {

    console.log("guestReceiptDetail", guestReceiptDetail)
  }, [guestReceiptDetail]);
  




  return (
    <>
      {isShow ? <div className='getOTP-container'>
        <div className='otp-container-chirld'>
          <h5>Enter your email to get OTP</h5>
          <input type="text" placeholder='Enter your email' value={emailInput} onChange={(e) => {
            setEmailInput(e.target.value)
          }} /><br />
          <button onClick={() => {
            handleGetOtp()
          }}>{loading ? <span className='loading-spinner'></span> : "Submit"}</button>
        </div>
      </div> : <></>}
      {isShowOTP ? <OTPVerification handleGetReceipt={handleGetReceipt} /> : <></>}
      {isShowReceipts ? guestReceiptDetail?.map((receipt: OrderItemDetail) => (
        <div className="receipt-container">
          <section className="h-100 gradient-custom">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-10 col-xl-8">
                  <div className="card" style={{ borderRadius: 10 }}>
                    <div className="card-header px-4 py-5">
                      <h5 className="text-muted mb-0">
                        Thanks for your Order,{" "}
                        <span style={{ color: "#a8729a" }}>{receipt.guest.email}</span>!
                      </h5>
                    </div>
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <p className="lead fw-normal mb-0" style={{ color: "#a8729a" }}>
                          Receipt
                        </p>
                        <p className="small text-muted mb-0">
                          Order Time : {receipt.createAt}
                        </p>
                        <p className="small text-muted mb-0">
                          Your Phone number: {receipt.guest.numberPhone}
                        </p>
                      </div>
                      {receipt.detail.map((item : CartItemType) => (
                          <div className="card shadow-0 border mb-4">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-2">
                                <img
                                  src={item.option.product_option_picture[0].picture}
                                  className="img-fluid"
                                  alt="Phone"
                                />
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0">{item.option.product.name}</p>
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">{item.quantity}</p>
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">{item.option.product.price}</p>
                              </div>
                           
                           
                            </div>
                            <hr
                              className="mb-4"
                              style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                            />
                            <div className="row d-flex align-items-center">
                              <div className="col-md-2">
                                <p className="text-muted mb-0 small">Track Order</p>
                              </div>
                              <div className="col-md-10">
                                <div
                                  className="progress"
                                  style={{ height: 6, borderRadius: 16 }}
                                >
                                  <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{
                                      width: "20%",
                                      borderRadius: 16,
                                      backgroundColor: "rgb(127, 173, 57)"
                                    }}
                                    aria-valuenow={20}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  />
                                </div>
                                <div className="d-flex justify-content-around mb-1">
                                  <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                    Out for delivary
                                  </p>
                                  <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                    Delivered
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="d-flex justify-content-between pt-2">
                        <p className="fw-bold mb-0">Order Details</p>
                        <h5 className="d-flex align-items-center justify-content-end text-black text-uppercase mb-0">
                          Total paid: <span className="h2 mb-0 ms-2">${receipt.total}.00</span>
                        </h5>
                      </div>
                      <div className="d-flex justify-content-between pt-2">


                      </div>
                      <div className="d-flex justify-content-between mb-5">
                        <p className="text-muted mb-0">Recepits code : {receipt.id}</p>

                      </div>
                    </div>
                    <div
                      className="card-footer border-0 px-4 py-5"
                      style={{
                        borderTop: "1px solid grey",
                        backgroundColor: "#fff",
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,

                      }}
                    >

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

      ))
       : <></>}

    </>


  )
}
