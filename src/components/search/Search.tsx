import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./search.scss"
import {  useState } from 'react';

import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import { useSelector } from 'react-redux';
import { StoreType } from '@/stores';


interface Product {
  id: string;
  name: string;
  avatar: string;
  desc: String
  price: number
  categoryId: string
  productOptions: ProductOptions[]

}
interface ProductOptions {
  id?: string
  productId: string
  product_option_picture: Product_option_picture[]
}

interface Product_option_picture {
  id?: string,
  picture: string

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
  const[searchStatus,setSearchStatus] = useState(false)
  const[searchData,setSearchData] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const categories = useSelector((store: StoreType) => store.categoryStore)
  let timeOut : any;
  function search(e : any) {
    console.log("search",e.target.value);
    clearTimeout(timeOut );
    if(e.target.value == ""){
      setSearchData([])
      return;
    };
    timeOut = setTimeout(async() => {
      //  call api
      setSearchStatus(true)
     try{
       if(searchStatus){
        console.log("abc");
        
        return
       }
       let result = await api.product.search(e.target.value);
       console.log("result",result);
       
       
       if(result.status == 200){
        // sau 1.5s set lai data & tat loading
        setTimeout(()=>{
            setSearchStatus(false);
            setSearchData(result.data.data);
            console.log("searchData",searchData);
            
            
        },1500)
       
       }else{
          // failed
          setSearchStatus(false);
       }
     }catch(err){
      console.log("loi call api search");
      

     }
    }, 600)
   
  }

  return (
    <>
      <Button variant="" onClick={handleShow} className="click_search">
        <i className="fa-solid fa-magnifying-glass "></i>
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement={placement}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='search_top'> <div className='search_input'>
            <form action="">
              <i style={{ padding: "0 15px 0 0" }} className="fa-solid fa-magnifying-glass"></i>

              <input onChange={(e) => search(e)} className='inputSearch' type="text" placeholder='what do you need ?' />
            </form>
          </div> </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='search_body'>
          <div className='search_categories'>
            <h4>List Categories</h4>
            {categories.data?.map((category: Category) => (
              <p key={Date.now() * Math.random()} onClick={()=> {navigate(`/shop/${category.id}`); handleClose()}} >{category.title}</p>
            ))}
        
            
           
          </div>
          <div className='container_search'>
            {searchStatus ? <div className="d-flex justify-content-center loading-wrapper">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div> : searchData?.map((item : Product ) => (
                 <div onClick={()=>{navigate(`/product/${item.id}`);handleClose()}} key={Date.now() * Math.random()} className='search_item' >
                 <img src={item.productOptions[0].product_option_picture[0].picture} alt="" />
                 <div className='name_item_search'>{item.name}</div>
               </div>
            ))}
                     
          </div>
        

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function Search() {
  return (
    <>
      <OffCanvasExample placement="top" name="top" />
    </>
  );
}

export default Search;
