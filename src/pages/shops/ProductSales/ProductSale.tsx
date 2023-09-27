import React, { useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./productSale.scss"
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

export default function SaleCarousel() {
    const { t } = useTranslation();
    const[listSale,setListSale] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        api.product.findByCategoryId("9cca584c-9055-4029-b49c-b1eba5328d73")
        .then(res => {setListSale(res.data.data)})
        .catch(err => err)
    },[])

    return (
        <section className="categories">

            <div className="container">
                <div className='title_sale'>
                    <div className='title_sale_icon'>
                    <i style={{ fontSize: "22px", paddingLeft: "8px" }} className="fa-solid fa-gift"></i>
                    <h3 >{t("best_price")}</h3>
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
                        {
                            listSale.map((salePoduct: Product) => (
                                <div className='sale_carou'>
                                <div className='sale_carou_chirl' >
                                <p className='off'>20% OFF</p>
                                    <img className="image" src={salePoduct.productOptions[0].product_option_picture[0].picture} alt="" />
                                    <div className='sale_carou_title'>
                                    <button className="btn-98" onClick={() => navigate(`/product/${salePoduct.id}`)}>{salePoduct.name}</button>
                                    </div>
                                </div>
                            </div>
                            ))
                        }
                        
                        {/* <div className='sale_carou'>
                            <div className='sale_carou_chirl' >
                            <p className='off'>20% OFF</p>
                                <img className="image" src="https://www.ikea.com/us/en/images/products/morabo-sofa-gunnared-light-green-wood__0602122_pe680191_s5.jpg?f=s" alt="" />
                                <div className='sale_carou_title'>    
                                    <button className="btn-98">Name Product</button>      
                                </div>
                            </div>
                        </div>
                        <div className='sale_carou'>
                            <div className='sale_carou_chirl' >
                            <p className='off'>20% OFF</p>
                                <img className="image" src="https://www.ikea.com/us/en/images/products/slattum-upholstered-bed-frame-knisa-light-gray__0768244_pe754388_s5.jpg?f=s" alt="" />
                                <div className='sale_carou_title'>
                                <button className="btn-98">Name Product</button>      
                                </div>
                            </div>
                        </div>
                        <div className='sale_carou'>
                            <div className='sale_carou_chirl' >
                            <p className='off'>20% OFF</p>
                                <img className="image" src="https://www.ikea.com/us/en/images/products/grimsbu-bed-frame-gray__0749249_pe747240_s5.jpg?f=s" alt="" />
                                <div className='sale_carou_title'>
                                <button className="btn-98">Name Product</button>      
                                </div>
                            </div>
                        </div>
                        <div className='sale_carou'>
                            <div className='sale_carou_chirl' >
                            <p className='off'>20% OFF</p>
                                <img className="image" src="https://www.ikea.com/us/en/images/products/barlast-table-lamp-black-white__1032422_pe836908_s5.jpg?f=s" alt="" />
                                <div className='sale_carou_title'>
                                <button className="btn-98">Name Product</button>      
                                </div>
                            </div>
                        </div>
                        <div className='sale_carou'>
                            <div className='sale_carou_chirl' >
                            <p className='off'>20% OFF</p>
                                <img className="image" src="https://assets.weimgs.com/weimgs/ab/images/wcm/products/202326/0158/martina-coffee-table-50-o.jpg" alt="" />
                                <div className='sale_carou_title'>
                                <button className="btn-98">Name Product</button>      
                                </div>
                            </div>
                        </div> */}

                    </Carousel>
                </div>
            </div>
        </section>

    )
}
