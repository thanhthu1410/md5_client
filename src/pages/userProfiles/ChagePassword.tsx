import  { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "./auth.scss"
import api from '../../services/api';
import { message } from 'antd';

function Example() {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
async function changePassword (e: any){
    e.preventDefault();
    setLoading(true)
    let confirmPass = e.target.cornfirm_pass.value;
    if(e.target.cornfirm_pass.value !== e.target.new_pass.value){
        message.error("Please Check Confirm Password")
    }else{
        let result = await api.users.changepassword({
            newPassword: e.target.new_pass.value,
            oldPassword: e.target.old_pass.value
        })
        .then(res => {
            if(res.status == 200){
                setTimeout(()=>{
                    setLoading(false)
                    handleClose()
                    message.success(res.data.message);
                },1500)
              
                
            }
        }    )

    }
    
}
    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                Change Password
            </Button>

            <Modal
                style={{ marginTop: "200px" }}
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title> Change Password !</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={async (e) => {changePassword(e)}}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Your Password:</Form.Label>
                            <Form.Control type="password" name="old_pass" placeholder="Enter your password ..." />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>New Password:</Form.Label>
                            <Form.Control type="password" name="new_pass" placeholder="Enter your new password ..." />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Confirm New Password:</Form.Label>
                            <Form.Control type="password" name="cornfirm_pass" placeholder="Enter your new password ..." />
                        </Form.Group>
                        <Button variant="primary" type='submit'  >Change</Button>
                    </Form>
                    <p>Resend Email In <span style={{ color: "red", cursor: "pointer" }} onClick={async (e) => {}}>Here</span> !</p>
                </Modal.Body>
                <Modal.Footer>
                {loading ? <span className='loading-spinner'></span> :   <Button variant="secondary" > Cancel </Button>}
                  
                    
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;