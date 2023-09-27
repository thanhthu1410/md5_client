import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { Modal as md } from 'antd'; // thông báo andtd
import "./auth.scss"
import { useSelector } from 'react-redux';
import { StoreType } from '../../stores';
import api from '../../services/api';
import {  message } from 'antd';

function Example() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(false);
    const userStore = useSelector((store : StoreType)=> store.userStore)
    const[upAvatar,setUpAvatar] = useState("")
    async function update(eventForm: any) {

        eventForm.preventDefault();

        let newData = {
            user_name: eventForm.target.user_name.value,
            last_name: eventForm.target.last_name.value,
       
        }

        try {
            setLoading(true);
            let result = await api.users.updateProfile(newData);
            setLoading(false);
            if (result.status == 200) {
                message.success( `${result.data.message}, Please Login !!`)
              
                        setTimeout(()=>{
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        },1500)
            } else {
               message.warning(`${result.data.message}, vui lòng thử lại!`)
            }
        } catch (err) {
            console.log("err", err)
            setLoading(false);
            
        }
    }

    async function updateAvatar() {

        // if (upAvatar.length > 0) {
        //     (document.querySelector('.input_img_preview')as HTMLImageElement).src = URL.createObjectURL(upAvatar[0]);
        // }

        try {
            if(upAvatar !== ""){       
                let formData = new FormData();
                formData.append('avatar', upAvatar[0]);
                setLoading(true);
                let result = await api.users.updateAvatar(formData);
                
                setLoading(false);
                if (result.status == 200) {
                 localStorage.setItem("token", result.data.token);
    
                } else {
                    console.log("errr nek");
                }
            } 
          
        }catch (err) {
            console.log("err", err)
            setLoading(false);
            console.log("loi roi nek");
            
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
                                        <img className='input_img_preview' src={userStore?.data?.avatar} alt="" />
                                        <input type="file" onChange={(e: any) => {
                                            console.log("e", e.target.files);
                                            setUpAvatar(e.target.files);
                                        }} className='input_btn' />
                                        {loading ? <span className='loading-spinner'></span>  : <button className='changeAva' onClick={()=>updateAvatar()}>Change Avatar</button> }
                                       
                                    </div>
                        <form  onSubmit={(e) => {
                                update(e)
                            }}>
                                <div className='content_change'>
                                   
                                    <div className='content_right'>
                                        <label htmlFor="">User_name: </label>
                                        <input type="text" name='user_name' defaultValue={userStore?.data?.user_name} style={{ border: "1px solid black", width: "500px", color: "black", borderRadius: "8px", padding: "10px", margin: "5px" }} /><br/>
                                        <label htmlFor="">Email : </label>
                                        <input type="text" name='first_name' defaultValue={"username"} style={{ border: "1px solid black", width: "500px", color: "black", borderRadius: "8px", padding: "10px", margin: "5px" }} /><br/>
                                        <label htmlFor="">Address : </label>
                                        <input type="text" name='first_name' defaultValue={"username"} style={{ border: "1px solid black", width: "500px", color: "black", borderRadius: "8px", padding: "10px", margin: "5px" }} />
                                        <button  type='submit' style={{width:"150px",borderRadius:"8px",padding:"5px",marginTop:"15px",color:"#fff",backgroundColor:"black"}} >Save</button>
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