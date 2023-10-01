import { useNavigate, useParams } from "react-router-dom"
import "./shopDetail.scss"
import { useEffect, useState } from "react";
import api from "@/services/api";
interface Product {
    name: string
    id: string
    desc: string
    price: string
    productOptions: ProductOptions[]
}
interface ProductOptions{
    id: string
    title: string
    product_option_picture: Product_option_picture[]
}
interface Product_option_picture{
    id: string
    picture: string

}
export default function Shopdetail() {
    const {id} = useParams()
    const [listProducts,setListProducts] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        api.product.findByCategoryId(id!)
        .then(res => setListProducts(res.data.data))
        .catch(err => console.log("err",err)
        )
    },[id])
    useEffect(()=>{
        console.log("listProducts",listProducts);
        
    },[listProducts])
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      function compareNumbers(a, b) {
        return a - b;
      }
      
    
      function sortPrice (){
        
      }
    
  return (
    <div className='shopdetail'>
        <h5 className='name-category'> Sectional Collections</h5>
        <div className='shopdetail-item'>
          
           {
            listProducts?.map((product: Product) => (
                <div className='item' onClick={()=>navigate(`/product/${product.id}`)} key={Math.random() * Date.now()}>
                <img src={product.productOptions[0].product_option_picture[0].picture} alt="" />
                <img className="img-top" src={product.productOptions[0].product_option_picture[1].picture} alt="" />
                <div className="item-title">
                <p>{product.name}</p>
                <p>{formatter.format(Number(product.price))}</p>
                </div>
                <button className="btn-98">Detail</button>
            </div>
            ))
           }

        </div>
    </div>
  )
}
