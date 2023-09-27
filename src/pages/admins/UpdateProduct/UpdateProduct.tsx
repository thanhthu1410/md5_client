import  { useState,useRef } from 'react';
import './updateProduct.scss';
import api from '@/services/api';
import { Modal, message } from 'antd';
import { useNavigate } from 'react-router-dom';

type UpdateOptionProp = {
product: any,
setIsOpenModal: any,
isOpenModal: any
}

interface Category {
    id: string;
    title: string;
    avatar: string;
}

export default function UpdateProduct(props: UpdateOptionProp) {
    const navigate = useNavigate()
    const [updateData, setUpdateData] = useState(props.product);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const urlPreviewRef = useRef<HTMLImageElement>(null);
    const cols:number = 40;
    const row: number = 5;
    const closeModal = () => {
        props.setIsOpenModal(false);
    }

    const openModal = () => {
        props.setIsOpenModal(true);
    }
    async function updateProduct(eventForm: any) {
        eventForm.preventDefault();
        let updateInfor = {
              name: eventForm.target.name.value,
              desc: eventForm.target.desc.value,
              price: Number(eventForm.target.price.value),
        };
        console.log("updateInfor",updateInfor);
        console.log("eventForm.target.avatar.files",eventForm.target.avatar.files);
        
        let formData = new FormData();
        if(eventForm.target.avatar.files.length > 0) {
            formData.append("avatar", eventForm.target.avatar.files[0]);
        }
        formData.append("product_infor", JSON.stringify(updateInfor));
     }

    return (
        <form className={`update-product ${props.isOpenModal ? 'open' : 'closed'}`} onSubmit={(eventForm)=>{
            eventForm.preventDefault();
            updateProduct(eventForm)
     }}>
            <div className='overlay' onClick={closeModal}></div>
            <div className='product-image'>
                <img src={props.product.avatar} ref={urlPreviewRef} alt="" />
                <input
                        name="avatar"
                        onChange={(event : any) => {
                        if (event.target.files.length == 0) {
                            console.log("Chưa chọn hình!");
                        } else {
                            let blodUrl = URL.createObjectURL(event.target.files[0]);
                            if( urlPreviewRef.current){
                                urlPreviewRef.current.src = blodUrl;
                            }   
                        }
                        }}
                        type="file"
          />
            </div>
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
                <textarea  id="desc" name="desc" cols={cols} rows={row} defaultValue={props.product.desc}></textarea>
            </div>
            <button type='submit' className='save-button'>Save</button>
        </form>
    )
}