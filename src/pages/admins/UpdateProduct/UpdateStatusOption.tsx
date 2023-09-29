import React, { useState } from 'react'
import { ProductOptions } from './UpdateProduct';
import "./updateProduct.scss"
import api from '@/services/api';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { productAction } from '@/stores/slice/product';
interface Props {
    product_option: any,
    closeModal: Function
}
export default function UpdateStatusOption(props: Props) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [activeStatus, setActiveStatus] = useState(Boolean(props.product_option.active))
    async function handleUpdateOption(e: any) {
        e.preventDefault();
        setLoading(true)
        const newData = {
            title: e.target.title.value,
            active: activeStatus
        }
        api.product.updateOption(props.product_option.id,newData)
        .then(res => {
            if(res.status == 200) {
                setLoading(false)
                props.closeModal()
                message.success(res.data.message)
                dispatch(productAction.reload())
              
            }else{
                setLoading(false)
            }          
        }    
        )
        setLoading(false)
        console.log("dataupdate", newData);
    }
    return (
        <form key={Math.random() * Date.now()} className='option-item' onSubmit={(e) => handleUpdateOption(e)}>
            <div className='option-title'>

                <label htmlFor="">Option Title </label> <br />
                <input type="text" name='title' defaultValue={props.product_option.title} />
                <p>Active :  {props.product_option.active ? <label className="switch">
                    <input type="checkbox" name='active' onChange={() => setActiveStatus(!props.product_option.active)
                    } defaultChecked defaultValue={props.product_option.active}/>
                    <span className="slider round"></span>
                </label> : <label className="switch">
                    <input type="checkbox" name='active' onInput={() => setActiveStatus(!props.product_option.active)} defaultValue={props.product_option.active}  />
                    <span className="slider round"></span>
                </label>}</p>
             

            </div>
            <div className='img-option'>
                {props.product_option.product_option_picture.map((picture: any) => (
                    <img key={Math.random() * Date.now()} src={picture.picture} alt="" />
                ))}
            </div>
            <button type='submit' className='save-button'>
                    {loading ? <span className='loading-spinner'></span> : "Save"}
                </button>
        </form>
    )
}
