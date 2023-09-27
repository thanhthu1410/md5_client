import axios from 'axios';
import { useState } from 'react';
import "./reset.scss"
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
function ResetPassword() {
    const { t } = useTranslation()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    async function reSetPassword(e: any) {
        e.preventDefault();
        console.log("email",e.target.reset.value);
        
        await api.users.resetpassword({ email: e.target.reset.value })
            .then(res => console.log("res", res))
            .catch(err => console.log("err", err))


    }
    return (
        <>
            <p onClick={handleShow}>
                <p className='fgPass'>{t("forgotPass")}</p>
            </p>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <form onSubmit={(e)=>reSetPassword(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{t("forgotPass")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="">Email:</label><br />
                        <input name='reset' type="text" placeholder={t("email")} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='close-btn' onClick={handleClose}>
                           {t("close")}
                        </button>
                        <button className='sendbtn' type='submit'> {t("send")}</button>
                    </Modal.Footer>
                </form>

            </Modal>
        </>
    );
}

export default ResetPassword;