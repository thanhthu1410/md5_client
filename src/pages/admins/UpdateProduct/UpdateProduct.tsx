import { useState, useRef } from 'react';
import './updateProduct.scss';
import api from '@/services/api';
import { Modal, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import UpdateStatusOption from './UpdateStatusOption';

type UpdateOptionProp = {
    product: any,
    setIsOpenUpdate: any,
    setOpenModalUpdate: any
}

export interface Product {
    id: string;
    name: string;
    avatar: string;
    desc: String
    price: number
    productOptions: ProductOptions[]

}
export interface ProductOptions {
    id?: string
    productId: string
    product_option_picture: Product_option_picture[]
    title: string
    active: string
}

export interface Product_option_picture {
    id?: string,
    picture: string

}

export default function UpdateProduct(props: UpdateOptionProp) {
    const navigate = useNavigate()
    const [updateData, setUpdateData] = useState(props.product);
    const urlPreviewRef = useRef<HTMLImageElement>(null);

    const cols: number = 60;
    const row: number = 4;
    const closeModal = () => {
        props.setOpenModalUpdate(false);
    }

    const openModal = () => {
        props.setOpenModalUpdate(true);
    }
    console.log("product", props.product);
    async function updateProduct(eventForm: any) {
        eventForm.preventDefault();
        let updateInfor = {
            id: props.product.id,
            name: eventForm.target.name.value,
            desc: eventForm.target.desc.value,
            price: Number(eventForm.target.price.value),
        };
        console.log("updateInfor", updateInfor);

        let formData = new FormData();
        formData.append("product_infor", JSON.stringify(updateInfor));

    }

    return (
        <div className={`update-product ${props.setIsOpenUpdate ? 'open' : 'closed'}`} >
            <form
                onSubmit={(eventForm) => {
                    eventForm.preventDefault();
                    updateProduct(eventForm)
                }}>
                <div className='overlay' onClick={closeModal}></div>

                <div className='form-group'>
                    <label htmlFor="">Name</label><br />
                    <input id='name' type="text" defaultValue={props.product.name} />
                </div>
                <div className='form-group'>
                    <label htmlFor="">Price</label><br />
                    <input type="text" id='price' name='price' defaultValue={props.product.price} />
                </div>

                <div className='form-group'>
                    <label htmlFor="">Description</label><br />
                    <textarea id="desc" name="desc" cols={cols} rows={row} defaultValue={props.product.desc}></textarea>
                </div>
                <button type='submit' className='save-button'>Save</button>
            </form>
            <div className='update-option'>
                {props.product.productOptions.map((product_option: ProductOptions) => (
                    <UpdateStatusOption closeModal={closeModal} product_option={product_option} key={Math.random() * Date.now()} />
                ))}
            
        </div>
        </div >
    )
}