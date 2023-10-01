import React, { useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./realted.scss"
import { useTranslation } from 'react-i18next';
import api from '@/services/api';
import { useNavigate } from 'react-router-dom';
interface Product {
    id: string;
    name: string;
    avatar: string;
    desc: String
    price: number
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
interface Props{
    categoryId: any
}
export default function RelatedProduct(props: Props) {
    const { t } = useTranslation();
    const[listSale,setListSale] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        api.product.findByCategoryId(props.categoryId)
        .then(res => {setListSale(res.data.data)})
        .catch(err => err)
    },[props.categoryId])

    return (
        <section className="related">

            <div className="container">
                <div className='title_sale'>
                    <div className='title_sale_icon'>
                    <h3 >RELATED PRODUCTS</h3>
                    </div>
                </div>

                <div className="row" style={{ margin: "10px" }}>
                    <Carousel className="categories__slider owl-carousel"
                        autoPlay={true}
                        additionalTransfrom={0}
                        arrows
                        autoPlaySpeed={1500}
                        centerMode={false}

                        containerClass="container-with-dots"
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        infinite
                        itemClass=""
                        keyBoardControl
                        minimumTouchDrag={80}
                        pauseOnHover
                        renderArrowsWhenDisabled={false}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={{
                            desktop: {
                                breakpoint: {
                                    max: 3000,
                                    min: 1024
                                },
                                items: 4,
                                partialVisibilityGutter: 40
                            },
                            mobile: {
                                breakpoint: {
                                    max: 464,
                                    min: 0
                                },
                                items: 1,
                                partialVisibilityGutter: 30
                            },
                            tablet: {
                                breakpoint: {
                                    max: 1024,
                                    min: 464
                                },
                                items: 2,
                                partialVisibilityGutter: 30
                            }
                        }}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={false}
                        shouldResetAutoplay
                        showDots={false}
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                    >
                        {   listSale.length > 0 ?
                            listSale.map((salePoduct: Product) => (
                                <div key={Math.random() * Date.now()} className='sale_carou'>
                                <div className='sale_carou_chirl' >
                               
                                    <img className="image" src={salePoduct.productOptions[0].product_option_picture[0].picture} alt="" />
                                    <div className='sale_carou_title'>
                                    <button className="btn-98" onClick={() => navigate(`/product/${salePoduct.id}`)}>{salePoduct.name}</button>
                                    </div>
                                </div>
                            </div>
                            )) : <div></div>
                        }
                        
                     
                    </Carousel>
                </div>
            </div>
        </section>

    )
}
