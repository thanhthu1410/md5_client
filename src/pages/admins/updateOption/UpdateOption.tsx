import  { useState,useRef } from 'react';
import './updateOption.scss';
import api from '@/services/api';
import { Modal, message } from 'antd';
import { useNavigate } from 'react-router-dom';

type UpdateOptionProp = {
product: any,
setIsOpenModal: any,
isOpenModal: any
}

interface Picture {
    file: File;
    url: string;
}

export default function UpdateOption(props: UpdateOptionProp) {
    const navigate = useNavigate()
    const [updateData, setUpdateData] = useState(props.product);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const urlPreviewRef = useRef<HTMLImageElement>(null);
    const cols:number = 40;
    const row: number = 5;
    const [pictures, setPictures] = useState<Picture[]>([]);
    const [loading, setLoading] = useState(false);
    const closeModal = () => {
        props.setIsOpenModal(false);
    }

    const openModal = () => {
        props.setIsOpenModal(true);
    }
    
    
    // async function updateProduct(eventForm: any) {
    //     eventForm.preventDefault();
    //     let updateInfor = {
    //           name: eventForm.target.name.value,
    //           desc: eventForm.target.desc.value,
    //           price: Number(eventForm.target.price.value),
    //     };
    //     console.log("updateInfor",updateInfor);
    //     console.log("eventForm.target.avatar.files",eventForm.target.avatar.files);
        
    //     let formData = new FormData();
    //     if(eventForm.target.avatar.files.length > 0) {
    //         formData.append("avatar", eventForm.target.avatar.files[0]);
    //     }
    //     formData.append("product_infor", JSON.stringify(updateInfor));
    //  }

     function hanldeAddOption(e: any) {
        e.preventDefault();
        setLoading(true)
        if (e.target.option.value !== "") {
            console.log('hanlding add option',  e.target.option.value,  props.product.id );
            const formData = new FormData()
            formData.append("product_options", JSON.stringify({ title: e.target.option.value, productId:  props.product.id }))
            pictures.map((picture) => { formData.append("imgs", picture.file) })
            api.product.createOption(formData)
                .then(res => {
                    console.log("res", res);
                    message.success(res.data.message);
                    (document.getElementById("option") as HTMLInputElement
                    ).value = "";
                    (document.getElementById("picture") as HTMLInputElement
                    ).value = "";
                    setPictures([])
                    setLoading(false)

                })
                .catch(err => {
                    console.log("err", err);
                    setLoading(false)
                })
        } else {
            message.warning("Please Enter title of option !");
            setLoading(false);
        }

    }


    return (
        <form className={`update-product ${props.isOpenModal ? 'open' : 'closed'}`} onSubmit={(eventForm)=>{
            eventForm.preventDefault();
            hanldeAddOption(eventForm)
     }}>
            <div className='overlay' onClick={closeModal}></div>
            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                    Add New Option { props.product.name}
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                <label htmlFor="">Option title:</label> <br />
                                <input type="text" className='inputtitle' placeholder='Enter option title...' name='option' id='option' />

                            </div>
                            <div className='form-group'>
                               
                                <input name="imgs" type="file" id='picture' multiple onChange={(e) => {
                                    if (e.target.files) {
                                        if (e.target.files.length > 0) {
                                            let tempPictures: Picture[] = [];
                                            for (let i in e.target.files) {
                                                if (i == "length") {
                                                    break
                                                }
                                                tempPictures.push({
                                                    file: e.target.files[i],
                                                    url: URL.createObjectURL(e.target.files[i])
                                                })
                                            }
                                            setPictures(tempPictures)


                                        }
                                    }
                                }} />
                                <div style={{ display: "flex", marginTop : "20px" }}>
                                    {
                                        pictures.map(picture => <img key={Math.random() * Date.now()} src={picture.url} style={{ width: "100px", height: "100px", borderRadius: "50%", marginRight : "15px" }} />)
                                    }
                                </div>
                            </div>

                            <div className="modal-footer1">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>

                                <button type='submit' className='savebutton btn btn-secondary'>
                                    {loading ? <span className='loading-spinner'></span> : "Save"}
                                </button>
                            </div>
        </form>
    )
}