import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { Modal as md } from 'antd'; // thông báo andtd
import "./auth.scss"
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../stores';
import api from '../../services/api';
import {  message } from 'antd';
import { userAction } from '@/stores/slice/user';

function Example() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(false);
    const userStore = useSelector((store : StoreType) => store.userStore)
    const[user,setUser] = useState(userStore.data)
    const[upAvatar,setUpAvatar] = useState([])
    useEffect(() => {

    },[])
    async function update(eventForm: any) {

        eventForm.preventDefault();
        setLoading(true);
        let newData = {
            user_name: eventForm.target.user_name.value,
            address: eventForm.target.address.value,
            phone_number: eventForm.target.phone_number.value
        }
        try {
           
            let result = await api.users.updateProfile(newData);
            setLoading(false);
            if (result.status == 200) {
                handleClose()
                message.success( `Update Information Successfull !!`)
              
                        setTimeout(()=>{
                            localStorage.setItem("token", result.data.token);
                            dispatch(userAction.setLoginData(result.data.data))
                        },2000)
            } else {
               message.warning(`${result.data.message}, vui lòng thử lại!`)
            }
        } catch (err) {
            console.log("err", err)
            setLoading(false);
            
        }
    }

    async function updateAvatar() {

        if (upAvatar.length > 0) {
            (document.querySelector('.input_img_preview')as HTMLImageElement).src = URL.createObjectURL(upAvatar[0]);
        }

        try {
            if(upAvatar.length > 0){       
                let formData = new FormData();
                formData.append('avatar', upAvatar[0]);
                setLoading(true);
                let result = await api.users.updateAvatar(formData);
                console.log("resule",result)
                
                
                setLoading(false);
                if (result.status == 200) {
                handleClose()
                message.success( `Update Avatar Successfull!`)
                 localStorage.setItem("token", result.data.token);
                 dispatch(userAction.setLoginData(result.data.data))
                 
    
                } else {
                    console.log("errr nek");
                }
            } 
          
        }catch (err) {
            console.log("err", err)
            setLoading(false);
       
        }
    }


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Update Profile
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='xl'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {<div className='changeInfo'>
                        <div className='content_left'>
                                        <img className='input_img_preview' src={userStore.data?.avatar} alt="" />
                                        <input  type="file" onChange={(e: any) => {
                                            console.log("e", e.target.files);
                                            setUpAvatar(e.target.files);
                                        }} className='input_btn' />
                                        {loading ? <button> <span className='loading-spinner changeAva'></span></button>  : <button className='changeAva' onClick={()=>updateAvatar()}>Change Avatar</button> }
                                       
                                    </div>
                        <form  onSubmit={(e) => {
                                update(e)
                            }}>
                                <div className='content_change'>
                                   
                                    <div className='content_right'>
                                        <label htmlFor="">User_name: </label><br/>
                                        <input type="text" name='user_name' defaultValue={userStore.data?.user_name} style={{ border: "1px solid black", width: "500px", color: "black", borderRadius: "8px", padding: "10px", margin: "5px" }} /><br/>
                                        <label htmlFor="">Email : </label><br/>
                                        <input type="text" name='first_name' value={userStore.data?.email} style={{ border: "1px solid black", width: "500px", color: "black", borderRadius: "8px", padding: "10px", margin: "5px" }} /><br/>
                                        <label htmlFor="">Phone Number: </label><br/>
                                        <input type="text" name='phone_number' defaultValue={userStore.data?.phone_number} style={{ border: "1px solid black", width: "500px", color: "black", borderRadius: "8px", padding: "10px", margin: "5px" }} /><br/>
                                        <label htmlFor="">Address : </label><br/>
                                        <input type="text" name='address' defaultValue={userStore.data?.address} style={{ border: "1px solid black", width: "500px", color: "black", borderRadius: "8px", padding: "10px", margin: "5px" }} />
                                        <button type='submit' style={{width:"150px",borderRadius:"8px",padding:"5px",marginTop:"15px",color:"#fff",backgroundColor:"black"}}> Save </button>
                                        
                                    </div>
                                </div>
                            </form>
                    </div>

                    }
                   
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                  
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;