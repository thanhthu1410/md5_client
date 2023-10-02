import { useNavigate, useParams } from "react-router-dom"
import "./shopDetail.scss"
import { useEffect, useState } from "react";
import api from "@/services/api";
import { useDispatch } from "react-redux";
import { productAction } from "@/stores/slice/product";
interface Product {
    name: string
    id: string
    desc: string
    price: string
    productOptions: ProductOptions[]
}
interface ProductOptions {
    id: string
    title: string
    product_option_picture: Product_option_picture[]
}
interface Product_option_picture {
    id: string
    picture: string

}
export default function Shopdetail() {
    const { id } = useParams()
    const [listProducts, setListProducts] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        api.product.findByCategoryId(id!)
            .then(res => setListProducts(res.data.data))
            .catch(err => console.log("err", err)
            )
    }, [id])
    useEffect(() => {
        console.log("listProducts", listProducts);

    }, [listProducts])
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });



    function sortPrice() {
        let sort = listProducts.sort((p1: any, p2: any) => {
            if (p1.price < p2.price) return -1;
            if (p1.price > p2.price) return 1;
            return 0;
        });
        console.log("sort", sort);

        setListProducts(sort);
        dispatch(productAction.reload())

    }
    
    function sortPriceHeighttoLow() {
        let sortHieghtToLow = listProducts.sort((p1: any, p2: any) => {
            if (p1.price > p2.price) return -1;
            if (p1.price < p2.price) return 1;
            return 0;
        });
        console.log("sortHieghtToLow", sortHieghtToLow);

        setListProducts(sortHieghtToLow);
        dispatch(productAction.reload())

    }

    return (
        <div className='shopdetail'>
            <h5 className='name-category'> Sectional Collections</h5>
          
            <div className="dropdown">
                <button className="btn-secondary dropdown-toggle sortbyprice-button" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Sort by Price
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><p onClick={() => sortPrice()}>Low To Hight</p></li>
                    <li><p onClick={() => sortPriceHeighttoLow()}>Height To Low</p></li>
                  
                </ul>
            </div>
            <div className='shopdetail-item'>

                {
                    listProducts?.map((product: Product) => (
                        <div className='item' onClick={() => navigate(`/product/${product.id}`)} key={Math.random() * Date.now()}>
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
