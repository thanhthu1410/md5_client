import { useSelector } from "react-redux"
import "./userReceipt.scss"
import { StoreType } from "@/stores"
import { useEffect,useState } from "react"
import { Receipt, ReceiptDetail } from "@/stores/slice/user"
import moment from "moment"


export default function UserReceipt() {
  const store = useSelector(store => store as StoreType )
  const userStore = store.userStore


  useEffect(()=>{
    console.log("userStore",userStore);
  },[userStore])
  return (
    <div className="receipt-container">
     
  
     
        {userStore.receipts?.map((item : Receipt) => (
            <section className="h-100 gradient-custom">
           <div className="container py-5 h-100">
             <div className="row d-flex justify-content-center align-items-center h-100">
             <div className="col-lg-10 col-xl-8">
               <div className="card" style={{ borderRadius: 10 }}>
                 <div className="card-header px-4 py-5">
                   <h5 className="text-muted mb-0">
                     Thanks for your Order,{" "}
                     <span style={{ color: "#a8729a" }}>{userStore.data?.user_name}</span>!
                   </h5>
                 </div>
                 <div className="card-body1 p-4">
                   <div className="d-flex justify-content-between align-items-center mb-4">
                     <p className="lead fw-normal mb-0" style={{ color: "#a8729a" }}>
                       Receipt
                     </p>
                     <p className="small text-muted mb-0">
                       Order Time :
                       {moment(new Date(Number(item.createAt))).format('DD/MM/YYYY')}
                     </p>
                     <p className="small text-muted mb-0">
                       Your Phone number: 099999888
                     </p>
                   </div>
                
                       <div className="card shadow-0 border mb-4">
                        {item.detail.map((itemDetail: ReceiptDetail) => (
                            <div className="card-body2">
                            <div className="row">
                              <div className="col-md-3">
                                <img
                                  src={itemDetail.option.product_option_picture[0].picture}
                                  className="img-fluid"
                                  alt="Phone"
                                />
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0">{itemDetail.option.product.name}</p>
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">{itemDetail.quantity}</p>
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">${itemDetail.option.product.price}.00</p>
                              </div>
                           
                           
                            </div>
                            {/* <hr
                              className="mb-4"
                              style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                            /> */}
                       
                          </div>
                        ))}
                       
                     </div>
                
                   
                   <div className="d-flex justify-content-between pt-2">
                     <p className="fw-bold mb-0">Order Details</p>
                     <h5 className="d-flex align-items-center justify-content-end text-black text-uppercase mb-0">
                       Total paid: <span className="h2 mb-0 ms-2">${item.total}.00</span>
                     </h5>
                   </div>
                   <div className="d-flex justify-content-between pt-2">
   
                              155 dang van ngu
                   </div>
                   <div className="d-flex justify-content-between mb-5">
                    {/* <p>Shipping Address : {item.address} </p> */}
                     <p className="text-muted mb-0">Recepits code : {item.id}</p>
                     <p>   Ship Status : {item.status}</p>
   
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
        ) 
      )
      }
       
      
    
  </div>
  )
}
