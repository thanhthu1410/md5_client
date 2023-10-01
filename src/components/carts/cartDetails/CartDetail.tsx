import { Popconfirm } from "antd";
import "./cartDetail.scss";
import { useState } from "react";
import { ReceiptDetail } from "@/stores/slice/user";
import { StoreType } from "@/stores";
import { useSelector } from "react-redux";
interface Props{
    receiptDetail: ReceiptDetail
}
export default function CartDetail(props: Props) {
    const [quantity, setQuantity] = useState(props.receiptDetail.quantity)
    const userStore = useSelector((store: StoreType) => {
        return store.userStore
    })
    console.log("detail",props.receiptDetail.option.product.categoryId);
    
    function handleChangeQuantity (quantity: number) {
        let cart = userStore.cart?.detail;
        if (cart) {
            if (userStore.socket) {
                userStore.socket.emit("addToCart", {
                    receiptId: userStore.cart?.id,
                    optionId: props.receiptDetail.optionId,
                    quantity
                })
            }
        }
    }
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    const totalCartDetail = props.receiptDetail.quantity * props.receiptDetail.option.product.price
    function handleDelete() {
        if(userStore.socket){
            userStore.socket.emit("deleteItemFromCart", {
                receiptId: userStore.cart?.id,
                optionId: props.receiptDetail.optionId,
            })
        }

    }
    return (
        <div className="cartDetail">
            <div className='cartDetail-item'>
                <img src={props.receiptDetail.option.product_option_picture[0].picture} alt="" />
                <div className="item-content">
                    <div className="item-content-top">
                        <p className="name-item">{props.receiptDetail.option.product.name} </p>
                        {props.receiptDetail.option.product.categoryId == "9cca584c-9055-4029-b49c-b1eba5328d73" ? <p className="salePrice">{formatter.format(Number(totalCartDetail * 1.2))}</p> : "" }
                        <p className="price-item"> {formatter.format(Number(totalCartDetail))}</p>
                 
                    </div>
                 <div className="item-content-bt">
                 <p className="quantity"><i className="fa-solid fa-minus" onClick={() => {
                        if (quantity > 1) {
                            setQuantity(quantity - 1)
                            handleChangeQuantity(quantity - 1)
                        }
                        
                    }}></i> <span>{quantity}</span><i onClick={() => {
                        setQuantity(quantity + 1)
                        handleChangeQuantity(quantity + 1)
                    }} className="fa-solid fa-plus"></i></p>
                    <Popconfirm
                        placement="bottomRight"
                        title={`Do you want to delete item `}
                        className="deletepop"
                        onConfirm={() => {
            
                            handleDelete()
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
