import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './orderDetail.scss';
import { Link } from 'react-router-dom';
import api from '@/services/api';

interface Product {
    name: string,
    avatar: string,
    price: number,
    des: string,
    categoryId: number,
    categoryName: string,
    updateAt: Date
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


export default function UserOrderDetail() {
    const { orderId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<OrderItemDetail[]>([]);
    const [guestReceiptDetail, setGuestReceiptDetail] = useState<OrderItemDetail[]>([]);
    const [productVisible, setProductVisible] = useState(false);
    const [guestInformation, setGuestInformation] = useState(null);

    // useEffect(() => {
    //     if (orderId) {
    //         setIsLoading(true);
    //         api.purchaseApi.findById(orderId)
    //             .then(res => {
    //                 if (res.status === 200) {
    //                     // console.log(res.data.data)
    //                     setGuestInformation(res.data.data)
    //                     // console.log("guestReceiptDetail", guestReceiptDetail)
    //                     setGuestReceiptDetail(res.data.data.guestReceiptDetail);
    //                 }
    //             })
    //             .finally(() => {
    //                 setIsLoading(false);
    //             });
    //     }
    // }, [orderId]);

  return (
    <div className='orderDetail-wrapper'>
    <p><Link to="/admin" className='dashboard'>Dashboard</Link> / <Link to="/admin/order" className='order'>Orders</Link> / Show</p>
    <div className='orderId'>
        <span className='title'>ID</span><br />
        <p>{(guestInformation as any)?.id}</p>
    </div>
    <div className='orderCustomer'>
        <span className='title'>Customer</span><br />
        <p>{(guestInformation as any)?.email}</p>
    </div>
    <div className='orderDelivery'>
        <span className='title'>Delivery Address</span><br />
        <p>Address</p>
    </div>
    <div className='orderCreated'>
        <span className='title'>Created</span><br />
        <p>2{(guestInformation as any)?.createAt}</p>
    </div>
    <table>
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Product</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price (per item)</th>
                <th scope="col">Total Price</th>
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
                    <td><img src={product.productDetail.avatar} alt="noImage" className={`${productVisible ? 'show' : ''}`} /></td>
                    <td className='orderProductDetail-name'>{product.productDetail.name}</td>
                    <td className='orderProductDetail-name'>{product.quantity}</td>
                    <td>${product.productDetail.price}</td>
                    <td>${product.quantity * product.productDetail.price}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
  )
}
