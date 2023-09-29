import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginSignin from './Login';
import { useTranslation } from 'react-i18next';
import "./login.scss"


// Define a union type for the allowed placement values
type OffcanvasPlacement = 'top' | 'bottom' | 'start' | 'end';

interface OffCanvasExampleProps {
  name: string;
  placement: OffcanvasPlacement | undefined; // Use the defined union type
}

function OffCanvasExample({ name, placement }: OffCanvasExampleProps) {
  const navigate = useNavigate()
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <span onClick={handleShow} className="login-title"> {t("login")}</span>
      <Offcanvas className="offcanvasCart" show={show} onHide={handleClose} placement={placement}>
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body className=''>
            <LoginSignin handleClose={handleClose}/>             
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function LoginMoldal() {
  return (
    <>
      <OffCanvasExample placement="end" name="top" />
    </>
  );
}

export default LoginMoldal;

