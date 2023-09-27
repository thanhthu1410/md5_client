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
    console.log("id categories",id);
    useEffect(()=>{
        api.product.findByCategoryId(id!)
        .then(res => setListProducts(res.data.data))
        .catch(err => console.log("err",err)
        )
    },[id])
    useEffect(()=>{
        console.log("listProducts",listProducts);
        
    },[listProducts])
    
  return (
    <div className='shopdetail'>
        <h5 className='name-category'>Sofa & Sectional Collections</h5>
        <div className='shopdetail-item'>
            {/* <div className='item'>
                <img src="https://assets.weimgs.com/weimgs/ab/images/wcm/products/202322/0043/toluca-outdoor-sofa-90-o.jpg" alt="" />
                <img  className="img-top" src="https://res.cloudinary.com/castlery/image/private/w_700,f_auto,q_auto/b_rgb:F3F3F3,c_fit/v1663560025/crusader/variants/54000048-IN4001/Lucas-3-Seater-Sofa-Square-Set_1-1663560022.jpg" alt="" />

                <div className="item-title">
                <p>Porto Outdoor Sofa</p>
                <p>$199.00</p>
                </div>
                <button className="btn-98">Pick Now </button>
            </div>
            <div className='item'>
                <img src="https://assets.weimgs.com/weimgs/ab/images/wcm/products/202322/0043/toluca-outdoor-sofa-90-o.jpg" alt="" />
                <img  className="img-top" src="https://i.pinimg.com/564x/67/29/c9/6729c9ad77a03655a899cfc73f194c14.jpg" alt="" />
                <div className="item-title">
                <p>Porto Outdoor Sofa</p>
                <p>$199.00</p>
                </div>
                <button className="btn-98">Pick Now </button>
            </div>
            <div className='item'>
                <img src="https://www.structube.com/media/catalog/product/0/1/01-81.51.94.19_tablelamp_iliana.jpg?auto=webp&format=pjpg&fit=bounds&bg-color=f2f2f2&canvas=undefined,undefined" alt="" />
                <img className="img-top" src="https://www.structube.com/media/catalog/product/r/o/ro-81.51.94.19_tablelamp_iliana.jpg?auto=webp&format=pjpg&fit=bounds&bg-color=f2f2f2&canvas=undefined,undefined" alt="" />
                <div className="item-title">
                <p>Porto Outdoor Sofa</p>
                <p>$199.00</p>
                </div>
                <button className="btn-98">Pick Now </button>
            </div>
            <div className='item'>
                <img src="https://www.structube.com/media/catalog/product/0/1/01-97.95.40.40_cuddlerchair_kudels.jpg?auto=webp&format=pjpg&fit=bounds&bg-color=f2f2f2&canvas=undefined,undefined" alt="" />
                <img className="img-top" src="https://www.structube.com/media/catalog/product/r/o/ro-97.95.40.40_cuddlerchair_kudels.jpg?auto=webp&format=pjpg&fit=bounds&bg-color=f2f2f2&canvas=undefined,undefined" alt="" />
                <div className="item-title">
                <p>Porto Outdoor Sofa</p>
                <p>$199.00</p>
                </div>
                <button className="btn-98">Pick Now </button>
            </div> */}
           {
            listProducts?.map((product: Product) => (
                <div className='item' onClick={()=>navigate(`/product/${product.id}`)}>
                <img src={product.productOptions[0].product_option_picture[0].picture} alt="" />
                <img className="img-top" src={product.productOptions[0].product_option_picture[1].picture} alt="" />
                <div className="item-title">
                <p>{product.name}</p>
                <p>${product.price}</p>
                </div>
                <button className="btn-98">Pick Now </button>
            </div>
            ))
           }

        </div>
    </div>
  )
}
