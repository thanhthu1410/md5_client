import { useEffect, useState } from "react"
import "./product.scss"
import { useParams } from "react-router-dom"
import api from "@/services/api"
import { message } from "antd";
import { useSelector } from "react-redux";
import { StoreType } from "@/stores";
import { ReceiptDetail } from "@/stores/slice/user";
import SaleCarousel from "../shops/ProductSales/ProductSale";
import RelatedProduct from "./relatedProducts/RelateProducts";


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
  product_option_picture: Product_option_picture[],
  title: string
}

interface Product_option_picture {
  id?: string,
  picture: string

}
export default function Product() {
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<Product>()
  const [selectedOption, setSelectedOption] = useState(0);
  const userStore = useSelector((store: StoreType) => {
    return store.userStore
  })
  const { id } = useParams()

  useEffect(() => {
    api.product.findProductById(id!)
      .then(res => setProduct(res.data.data))
      .catch(err => err)
  }, [id])

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });


  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  }

  function handleChangeImage(url: string) {
    const mainImage = document.querySelector(".main-product-image") as HTMLImageElement;
    if (mainImage) {
      mainImage.src = url
    }
  }

  const handleAddToCart = () => {
    const cart = userStore.cart?.detail;
    if (cart && product && product.productOptions && product.productOptions[selectedOption]) {
      const selectedProductOption = product.productOptions[selectedOption];
      const foundItem = cart.find((item: ReceiptDetail) => item.optionId === selectedProductOption.id);

      if (foundItem) {
        const quantityParam = foundItem.quantity + quantity;

        if (userStore.socket) {
          userStore.socket.emit("addToCart", {
            receiptId: userStore.cart?.id,
            optionId: selectedProductOption.id,
            quantity: quantityParam
          });
        }

        message.success("Add To Cart Successfully");

      } else {
        if (userStore.socket) {
          userStore.socket.emit("addToCart", {
            receiptId: userStore.cart?.id,
            optionId: selectedProductOption.id,
            quantity: quantity,

          });
        }
        message.success("Add To Cart Successfully");
      }
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
            <img key={Math.random() * Date.now()} src={item.picture} alt="" onMouseOver={() => handleChangeImage(item.picture)} />
          ))}
        </div>
        <div className="product-avatar">

          <img src={product?.productOptions[selectedOption].product_option_picture[0].picture} alt="" className="main-product-image" />
          {product?.categoryId == "9cca584c-9055-4029-b49c-b1eba5328d73" ? <img className="imgSale" src="/images/sale.png" alt="" /> : <></>}
        </div>
        <div className="product-infor">
          <h3>{product?.name}</h3>
          <p>Description : {product?.desc}</p>
          <p className="title-option"> Product Options: {product?.productOptions[selectedOption].title}</p>

          <div className="product-option">
            {product?.productOptions.map((option: any, index: number) => (
              <img key={Math.random() * Date.now()} src={option.product_option_picture[0].picture} alt="" onClick={() => { handleOptionClick(index), setQuantity(1) }} />
            ))}

          </div>

          <div className="priceSale">
            <p className="beforePrice">Price :  {formatter.format(Number(product?.price))}</p>
            {product?.categoryId == "9cca584c-9055-4029-b49c-b1eba5328d73" ?
            <div className="sale-price-container"> <span className="saleTitle">{formatter.format(Number(product?.price * 1.2))}</span><span className="percent">{`( - 20%)`}</span></div> 
            : <></>}
          </div>

          <p className="quantity"><i className="fa-solid fa-minus" onClick={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1)
            }
          }}></i> <span>{quantity}</span><i onClick={() => {
            setQuantity(quantity + 1)
          }} className="fa-solid fa-plus"></i></p>


          <button className="btn-52" onClick={() => handleAddToCart()}>
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
      <RelatedProduct categoryId={product?.categoryId} />
    </div>
  )
}
