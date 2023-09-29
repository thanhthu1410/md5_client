import React, { useState, useEffect } from 'react'
import "./adminProduct.scss"
import axios from 'axios';
import api from '../../../services/api/index';
import { useNavigate } from 'react-router-dom';
// import UpdateProduct from '../UpdateProduct/UpdateProduct';
import { useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import UpdateProduct from '../UpdateProduct/UpdateProduct';
import UpdateOption from '../updateOption/UpdateOption';

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

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [maxItemPage, setMaxItemPage] = useState(8);
  const [skipItem, setSkipItem] = useState(0);
  const [maxPage, setMaxPage] = useState<any[]>([]);
  const [listProduct, setListProduct] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [productData, setProductData] = useState(null);

  // bang update
  const [openModalUpdate,setOpenModalUpdate] = useState(false)
  const [isOpenUpdate,setIsOpenUpdate] = useState(false)
 
  const navigate = useNavigate();
  const productStore = useSelector((store: StoreType) => store.productStore)
  
  useEffect(() => {
    console.log("productStore", productStore);

  }, [])
  useEffect(() => {
    setIsLoading(true);
    api.product.findAll(maxItemPage, skipItem)
      .then(res => {
        if (res.status == 200) {
          // console.log("res.data", res.data)
          let maxPageArr: any[] = [];
          for (let i = 0; i < res.data.maxPage; i++) {
            maxPageArr.push({
              number: Number(i) + 1,
              skip: res.data.data.length * Number(i)
            })
          }
          setMaxPage(maxPageArr);
          setSkipItem(res.data.data.length)
          setProducts(res.data.data)
        }
      })
      .catch(err => {

      })
      .finally(() => {
        setIsLoading(false); // Kết thúc loading
      });
  }, [productStore.reLoad])

  function changePage(pageItemObj: any) {
    api.product.findAll(maxItemPage, pageItemObj.skip)
      .then(res => {
        if (res.status == 200) {
          console.log("res.data", res.data)
          let maxPageArr: any[] = [];
          for (let i = 0; i < res.data.maxPage; i++) {
            maxPageArr.push({
              number: Number(i) + 1,
              skip: res.data.data.length * Number(i)
            })
          }
          setMaxPage(maxPageArr);
          setSkipItem(res.data.data.length)
          setProducts(res.data.data)
        }
      })
  }


  return (
    <div className='container-listproduct'>
      <div className='adm-title'>
        <span onClick={() => navigate("/admin")}>Admin / </span> <span className='title-list'>List Products</span>
      </div>
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Avatar</th>
              <th scope="col">Name </th>
              <th scope="col">Price</th>
           
              <th scope="col">Option</th>
              <th scope="col">Description</th>
              <th scope="col">Update </th>
            </tr>
          </thead>
          <tbody>
      
            {isLoading ? <div className="d-flex justify-content-center loading-wrapper">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div> :
              products?.map((item: any, index: number) => (
                <tr key={Math.random() * Date.now()}>
                  <th scope="row">{index}</th>
                  <td className='item-img'><img src={(item as Product).productOptions[0]?.product_option_picture[0].picture} alt="" /></td>
                  <td className='item-name'>{(item as Product).name}</td>
                  <td>{(item as Product).price}</td>
          
                  <td>{(item as Product).productOptions?.length}</td>
                  <td onClick={() => {
                    setProductData(item);
                    setIsOpenModal(true);
                  }}
                  >Add Option</td>
                  <td onClick={() => {
                    setProductData(item);
                    setOpenModalUpdate(true);
                  }}>Update</td>
                </tr>
              ))}
          </tbody>
        </table>
        <nav aria-label="Page navigation example page_box">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {
              maxPage.map(item => {
                return (
                  <li key={Math.random() * Date.now()} className="page-item"><a className="page-link" href="#" onClick={() => changePage(item)}>{item.number}</a></li>
                )
              })
            }
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
        {isOpenModal && productData && <UpdateOption product={productData} setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal} />}
        {openModalUpdate &&  productData && <UpdateProduct setOpenModalUpdate={setOpenModalUpdate} product={productData} setIsOpenUpdate={setIsOpenUpdate}/>}
      </div>

    </div>
  )
}
