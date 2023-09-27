import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./cart.scss"
import {  useState } from 'react';

import { useNavigate } from 'react-router-dom';
import CartDetail from './cartDetails/CartDetail';


interface Product {
  id: string;
  name: string;
  avatar: string;
  price: number;
  desc: string;
  categoryId: string;

}
interface Category {
  id: string;
  title: string;
  avatar: string;
}
// Define a union type for the allowed placement values
type OffcanvasPlacement = 'top' | 'bottom' | 'start' | 'end';

interface OffCanvasExampleProps {
  name: string;
  placement: OffcanvasPlacement | undefined; // Use the defined union type
}

function OffCanvasExample({ name, placement }: OffCanvasExampleProps) {
  const navigate = useNavigate()

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const cols : number = 48
  const rows : number = 3
  

  return (
    <>
      <Button variant="" onClick={handleShow} className="click_cart">
      <i className="fa fa-shopping-bag" /> 
      <p className='quantityInCart'>1</p>
      </Button>
      <Offcanvas className="offcanvasCart" show={show} onHide={handleClose} placement={placement}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='cart_top'> 
          <div className='title-cart'>
              <h5>Your Oder </h5>
            </div> 
           </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='cart_content'>
         <p>Product : 1</p>
         <p> Your Shopping Cart is empty ! </p>
                <div className='containerCartDetail'>
                    <CartDetail/>
                    <CartDetail/>
                </div>
               <div className='final-checkout'>
                  <div className='noteA'>
                    <p>Note:</p>
                    <textarea className='textarea' name="" id="" cols={cols} rows={rows} ></textarea>
                  </div>
                  <div className='total-container'>
                  <p>Freeship with total $1.999.00</p>
                  <p className='total'>SubTotal : $199.00</p>
                  </div>
                  <button className='checkout-btn'>Check Out</button>

               </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function Cart() {
  return (
    <>
      <OffCanvasExample placement="end" name="top" />
    </>
  );
}

export default Cart;

