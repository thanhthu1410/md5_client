import { useEffect, useState } from "react"
import "./product.scss"
import { useParams } from "react-router-dom"
import api from "@/services/api"


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
export default function Product() {
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<Product>()
  const [selectedOption, setSelectedOption] = useState(0);
  

  const { id } = useParams()

  useEffect(() => {
    api.product.findProductById(id!)
      .then(res => setProduct(res.data.data))
      .catch(err => err)
  }, [id])

 

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  }

  function handleChangeImage(url: string) {
    const mainImage = document.querySelector(".main-product-image") as HTMLImageElement;
    if (mainImage) {
      mainImage.src = url
    }
  }

  return (
    <div className="product">
      <div className="product-banner">
        <img src="/images/product.webp" alt="" />
        <div className="title">
          <h3>Comfortable</h3>
          <p>From 2-seaters for cosy apartment living to L-shaped sectionals for family movie nights, we’ve got just what you need. Find the lounge piece you’re looking for with soft, cloud-like options.</p>
        </div>
      </div>
      <div className="product-content">
        <div className="list-img">
          {product?.productOptions[selectedOption].product_option_picture.map((item: any, index: number) => (
            <img  key={Math.random() * Date.now()} src={item.picture} alt="" onMouseOver={() => handleChangeImage(item.picture)} />
          ))}
        </div>
        <div className="product-avatar">
        
          <img src={product?.productOptions[selectedOption].product_option_picture[0].picture} alt="" className="main-product-image" />
            {product?.categoryId == "9cca584c-9055-4029-b49c-b1eba5328d73" ?  <img className="imgSale" src="/images/sale.png" alt="" /> : <></>}
        </div>
        <div className="product-infor">
          <h3>{product?.name}</h3>
          <p>Description : {product?.desc}</p>
          <p className="title-option"> Product Options: </p>

          <div className="product-option">
            {product?.productOptions.map((option: any, index: number) => (
              <img  key={Math.random() * Date.now()} src={option.product_option_picture[0].picture} alt="" onClick={() =>{ handleOptionClick(index), setQuantity(1)}} />
            ))}

          </div>

            <div className="priceSale">
            <p>Price : ${product?.price}.00 </p>
            {product?.categoryId == "9cca584c-9055-4029-b49c-b1eba5328d73" ?  <p className="saleTitle">${product?.price * 1.2}00</p> : <></>}
            </div>
         
          <p className="quantity"><i className="fa-solid fa-minus" onClick={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1)
            }
          }}></i> <span>{quantity}</span><i onClick={() => {
            setQuantity(quantity + 1)
          }} className="fa-solid fa-plus"></i></p>


          <button className="btn-52">
            <div className="original">Pick &nbsp; Now</div>
            <div className="letters">

              <span>P</span>
              <span>I</span>
              <span>C</span>
              <span>K  &nbsp;</span>
              <span>N</span>
              <span>O</span>
              <span>W</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
