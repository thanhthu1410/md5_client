import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './orderDetail.scss';
import { Link } from 'react-router-dom';
import api from '@/services/api';
import { ReceiptDetail, User } from '@/stores/slice/user';

interface Product {
    name: string,
    avatar: string,
    price: number,
    des: string,
    categoryId: number,
    categoryName: string,
    updateAt: Date
    productOptions: any[]
}

interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}

interface OrderItemDetail extends OrderItem {
    productDetail: Product
}

interface GuestInformation {
    email: string
}

export default function OrderDetail() {
    const { orderId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<ReceiptDetail[]>([]);
    const navigate = useNavigate()
    const [productVisible, setProductVisible] = useState(false);

    useEffect(() => {
        if (orderId) {
            setIsLoading(true);
            api.receipt.findById(orderId)
                .then(res => {
                    if (res.status === 200) {
                        setProducts(res.data.data)
                        // setGuestReceiptDetail(res.data.data.guestReceiptDetail);
                        console.log("res", res);
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [orderId]);


    return (
        <div className='orderDetail-wrapper'>
           <nav>
                <ul className='addProduct-nav'>
                    <li onClick={() => navigate("/admin")}>Admin /</li>
                    <li className='add-title'>Receipt Detail</li>

                </ul>
            </nav>
            <table>
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Product</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <div className="d-flex justify-content-center loading-wrapper">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : products?.map((product, index) => (
                        <tr key={index} className='orderProductDetail'>
                            <td>{index + 1}</td>
                            <td><img src={product?.option.product.productOptions[0].product_option_picture[0].picture} alt="noImage" className={`${productVisible ? 'show' : ''}`} /></td>
                            <td className='orderProductDetail-name'>{product.option.product.name}</td>
                            <td className='orderProductDetail-name'>{product.quantity}</td>
                            <td>${product.option.product.price}</td>
                            <td>${product.quantity * product.option.product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}