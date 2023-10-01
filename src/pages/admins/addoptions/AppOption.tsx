import React, { useEffect, useState } from 'react'
import "./addoption.scss"
import api from '@/services/api';
import { message } from 'antd';
interface Props {
    id: string
    name: string
}
interface Picture {
    file: File;
    url: string;
}

export default function AppOption(props: Props) {
    const [pictures, setPictures] = useState<Picture[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{     
    },[props.id])
    function hanldeAddOption(e: any) {
        e.preventDefault();
        setLoading(true)
        if (e.target.option.value !== "") {         
            const formData = new FormData()
            formData.append("product_options", JSON.stringify({ title: e.target.option.value, productId: props.id }))
            pictures.map((picture) => { formData.append("imgs", picture.file) })
            api.product.createOption(formData)
                .then(res => {               
                    message.success(res.data.message);
                    (document.getElementById("option") as HTMLInputElement
                    ).value = "";
                    (document.getElementById("picture") as HTMLInputElement
                    ).value = "";
                    setPictures([])
                    setLoading(false)

                })
                .catch(err => {
                    setLoading(false)
                })
        } else {
            message.warning("Please Enter title of option !");
            setLoading(false);
        }

    }

    return (
        <>
            {/* Button trigger modal */}
            <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
            >
                Add Option
            </button>
            {/* Modal */}
            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={(e) => hanldeAddOption(e)}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                    Add New Option {props.name}
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
                                <input type="text" name='option' id='option' />

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
                                <div style={{ display: "flex" }}>
                                    {
                                        pictures.map(picture => <img key={Math.random() * Date.now()} src={picture.url} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />)
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

                                <button type='submit' className='savebutton'>
                                    {loading ? <span className='loading-spinner'></span> : "Save"}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>

    )
}
