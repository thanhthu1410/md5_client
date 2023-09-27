import { Popconfirm } from "antd";
import "./cartDetail.scss";
import { useState } from "react";
export default function CartDetail() {
    const [quantity, setQuantity] = useState(1)
    return (
        <div className="cartDetail">
            <div className='cartDetail-item'>
                <img src="https://res.cloudinary.com/castlery/image/upload/w_960,f_auto,q_auto/v1692869397/marketing/AU/Secondary%20Widget/AU_24082023_Cat2-Desktop.jpg" alt="" />
                <div className="item-content">
                    <div className="item-content-top">
                        <p className="name-item">Sofa </p>
                        <p className="price-item"> $199.00 </p>
                    </div>
                 <div className="item-content-bt">
                 <p className="quantity"><i className="fa-solid fa-minus" onClick={() => {
                        if (quantity > 1) {
                            setQuantity(quantity - 1)
                        }
                    }}></i> <span>{quantity}</span><i onClick={() => {
                        setQuantity(quantity + 1)
                    }} className="fa-solid fa-plus"></i></p>
                    <Popconfirm
                        placement="bottomRight"
                        title={`Do you want to delete item `}
                        description={"Delete product"}
                        onConfirm={() => {
                            console.log("ok");
                            
                            //   handleDelete(props.product.productId)
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="buttonDlt">
                            <i className="fa-regular fa-trash-can"></i>
                        </button>
                    </Popconfirm>
                 </div>



                </div>
            </div>
            
        </div>
    )
}
