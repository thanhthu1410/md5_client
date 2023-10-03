import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "./auth.scss"
import api from '../../services/api';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import { userAction } from '@/stores/slice/user';

function Example() {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const userStore = useSelector((store: StoreType) => store.userStore)
    const dispatch = useDispatch()
    async function changePassword(e: any) {
        e.preventDefault();
        setLoading(true)
        let confirmPass = e.target.cornfirm_pass.value;
        if(e.target.new_pass.value.length < 6){
                message.warning({content:"Password must be at least 6 characters long.",
                className : "messChangePass"})
                setLoading(false)
        }
        if (e.target.cornfirm_pass.value !== e.target.new_pass.value) {
            message.error({content:"Please Check Confirm Password",
        className : "messChangePass"})
        setLoading(false)
        } else {
            let result = await api.users.changepassword({
                newPassword: e.target.new_pass.value,
                oldPassword: e.target.old_pass.value
            })
                .then(res => {
                    if (res.status == 200) {
                        setTimeout(() => {
                            setLoading(false)
                            handleClose()
                            message.success(res.data.message);
                            // setTimeout(() => {
                                
                            //     localStorage.removeItem("token");
                            //     dispatch(userAction.reload());
                            //     window.location.href = "/"

                            // }, 1500)

                        }, 1500)


                    }else{
                        message.warning({content: res.data.message, className: "messChangePass"})
                        setLoading(false)
                    }
                })
                .catch(err => console.log("err"))

        }
        setLoading(false)

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

                    <Form onSubmit={async (e) => { changePassword(e) }}>
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
                        <Button variant="primary" type='submit'  >{loading ? <span className='loading-spinner'></span> : "Change Password"}</Button>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
            <Button variant="secondary" > Cancel </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;