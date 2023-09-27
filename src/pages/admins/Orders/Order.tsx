import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './order.scss';
import api from '@/services/api';
import { Modal, message } from 'antd';

interface Order {
    id: string,
    email: string,
    phoneNumber: string,
    address: string,
    state: string,
    createAt: Date
}

export default function Order() {
    const state = ["PENDING", "ACCEPTED", "SHIPPING", "DONE"];
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [maxItemPage, setMaxItemPage] = useState(10);
    const [skipItem, setSkipItem] = useState(0);
    const [maxPage, setMaxPage] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        api.purchaseApi.findAll(maxItemPage, skipItem)
            .then(res => {
                if (res.status == 200) {
                    let maxPageArr: any[] = [];
                    for (let i = 0; i < res.data.maxPage; i++) {
                        maxPageArr.push({
                            number: Number(i) + 1,
                            skip: res.data.data.length * Number(i)
                        })
                    }
                    setMaxPage(maxPageArr);
                    setSkipItem(res.data.data.length);
                    setOrders(res.data.data);
                } else {
                    alert(res.data.message)
                }
            })
            .catch(err => {

            })
            .finally(() => {
                setIsLoading(false); // Kết thúc loading
                // setProductVisible(false);
            });
    }, [])

    function changePage(pageItemObj: any) {
        api.purchaseApi.findAll(maxItemPage, pageItemObj.skip)
            .then(res => {
                if (res.status == 200) {
                    console.log("res.data", res.data)
                    let maxPageArr: any[] = [];
                    for (let i = 0; i < res.data.maxPage; i++) {
                        maxPageArr.push({
                            number: Number(i) + 1,
                            skip: res.data.data.length * Number(i)
                        })
                    }
                    setMaxPage(maxPageArr);
                    setSkipItem(res.data.data.length)
                    setOrders(res.data.data);
                }
            })
    }

    return (
        <div className='orders-wrapper'>
           <nav>
                <ol className='addProduct-nav'>
                    <li onClick={()=> navigate("/admin")}>Admin /</li>
                    <li className='add-title'>User-Order </li>
             
                </ol>
            </nav>
            <div className='orders-admin-box'>
                <div className='orders-title'><h2>Orders</h2><span>{orders.length}</span></div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Delivery Address</th>
                        <th scope="col">Status</th>
                        <th scope="col">Created</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <div className="d-flex justify-content-center loading-wrapper">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : orders?.map((order, index) => (
                        <tr key={Math.random() * Date.now()} className='order'>
                            <td>{(order as Order).id}</td>
                            <td>{(order as Order).email}</td>
                            <td>{(order as Order).address}</td>
                            <td  className='optionState' onClick={(e) => {
                                if(order.state == "DONE") return
                                let curStateIndex = state.indexOf((order as Order).state);
                                Modal.confirm({
                                    content: ("You want to next step " + state[curStateIndex + 1]),
                                    onOk: () => {
                                        api.purchaseApi.update((order as Order).id, {
                                            state: state[curStateIndex + 1],
                                            type: false
                                        })
                                            .then(res => {
                                                message.success(res.data.message);
                                                (e.target as HTMLElement).querySelector('select')!.value = state[curStateIndex + 1];
                                                setOrders(orders.map(orderMap => {
                                                    if(orderMap.id == order.id) {
                                                        orderMap.state = state[curStateIndex + 1];
                                                    }
                                                    return orderMap
                                                }))
                                            })
                                            .catch(err => {
                                                alert("Lỗi rồi!")
                                            })
                                    }
                                });
                            
                            }}>
                                <select className='optionState' disabled defaultValue={(order as Order).state}>
                                    <option value="PENDING">Pending</option>
                                    <option value="ACCEPTED">Accepted</option>
                                    <option value="SHIPPING">Shipping</option>
                                    <option value="DONE">Done</option>
                                </select>
                            </td>
                            <td className='date'>{(order as Order).createAt.toLocaleString()}</td>
                            <td>
                                <span className="material-symbols-outlined" onClick={() => {
                                    navigate(`${(order as Order).id}`)
                                }}>
                                    more_horiz
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav aria-label="Page navigation example page_box">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {
                        maxPage.map(item => {
                            return (
                                <li key={Math.random() * Date.now()} className="page-item"><a className="page-link" href="#" onClick={() => changePage(item)}>{item.number}</a></li>
                            )
                        })
                    }
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
         
        </div>
    )
}