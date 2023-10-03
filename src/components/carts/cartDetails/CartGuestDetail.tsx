import { Popconfirm } from "antd";
import "./cartDetail.scss";
import { useState } from "react";
import { StoreType } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { CartItemType, guestCartActions } from "@/stores/slice/guestCart.slice";
interface Props {
    guestReceipt: CartItemType;
}
export default function CartGuestReceipt(props: Props) {
    console.log("props",props.guestReceipt);
    const dispatch = useDispatch()
  
    const [quantity, setQuantity] = useState(props.guestReceipt.quantity)
    const userStore = useSelector((store: StoreType) => {
        return store.userStore
    })
    function handleChangeQuantity(quantity: number) {   
        let cart = JSON.parse(localStorage.getItem("cart") ?? "[]")
        let findResult = cart.find((item: any) => props.guestReceipt.option.id === item.option.id)
        if(findResult) {
            findResult.quantity = quantity
            localStorage.setItem("cart", JSON.stringify(cart))
            dispatch(guestCartActions.setCart(cart))
        }
    }
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
  
    function handleDelete(itemId: string) {
        console.log("itemi",itemId);
        
        let cart = JSON.parse(localStorage.getItem("cart") ?? "[]")
                      let findResult = cart.find((itemFind: any) => itemFind.option.id === itemId)
                      if(findResult) {
                          cart = cart.filter((itemFind: any) => itemFind.option.id !== itemId)
                          localStorage.setItem("cart", JSON.stringify(cart))
                          dispatch(guestCartActions.setCart(cart))
                      }
    }
    return (
        <div className="cartDetail">
            {props.guestReceipt ?
                <div className='cartDetail-item'>
                    <img src={props.guestReceipt.option.product_option_picture[0].picture} alt="" />
                    <div className="item-content">
                        <div className="item-content-top">
                            <p className="name-item">{`${props.guestReceipt.option.product.name} (${props.guestReceipt.quantity})`} </p>
                            {/* {props.receiptDetail.option.product.categoryId == "9cca584c-9055-4029-b49c-b1eba5328d73" ? <p className="salePrice">{formatter.format(Number(totalCartDetail * 1.2))}</p> : ""} */}
                            <p className="price-item"> {formatter.format(Number(props.guestReceipt.option.product.price))}</p>

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

                                    handleDelete(props.guestReceipt.option.id)
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

                :
                <div className='cartDetail-item'>
                    <img src="" alt="" />
                    <div className="item-content">
                        <div className="item-content-top">
                            <p className="name-item">name </p>

                            <p className="price-item">price 99</p>

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

                                    handleDelete(props.guestReceipt.option.id)
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
            }


        </div>
    )
}
