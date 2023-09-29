import { useEffect, useRef, useState, } from 'react'
import './AddProduct.scss';
import api from '@/services/api';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { StoreType } from '@/stores';
import { useSelector } from 'react-redux';

interface Category {
    id: string;
    title: string;
    avatar: string;
}
interface Picture {
    file: File;
    url: string;
}

export default function AddProduct() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [pictures, setPictures] = useState<Picture[]>([]);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const store = useSelector(store => store) as StoreType;
    useEffect(() => {
        setCategories(store.categoryStore.data)
    }, [])

    function addNewProduct(e: FormDataEvent) {
        e.preventDefault();
        setLoading(true);
        if ((e.target as any).categoryId.value == "" || (e.target as any).name.value == "" || (e.target as any).desc.value == "" || (e.target as any).price.value == "") {
            message.warning("Please Check Information of Product !")
            setLoading(false);
            return
        }
     
        const newData = {
            categoryId: (e.target as any).categoryId.value,
            name: (e.target as any).name.value,
            desc: (e.target as any).desc.value,
            price: (e.target as any).price.value,
            product_options:(e.target as any).option.value,
           
        }

        let formData = new FormData();
        if(pictures.length > 0) {
            for(let i in pictures){
                formData.append("imgs",pictures[i].file)
            }
            formData.append("products",JSON.stringify(newData))
        }else{
            message.warning("Please choose image of option ")
        }
        

        api.product.create(formData)
            .then((res: any) => {
                console.log("res", res)
                setLoading(false);
                message.success(res.data.message);
                (document.getElementById("name") as HTMLInputElement
                ).value = "";
                (document.getElementById("desc") as HTMLInputElement
                ).value = "";
                (document.getElementById("price") as HTMLInputElement
                ).value = "";

            })
            .catch((err: any) => {
                setLoading(false);
            })
              


    }

    return (
        <div className='addProduct-container'>
            <nav>
                <ul className='addProduct-nav'>
                    <li onClick={() => navigate("/admin")}>Admin /</li>
                    <li className='add-title'>Add Product </li>

                </ul>
            </nav>
            <h2>Add new product</h2>
            <form
                onSubmit={(e) => { addNewProduct(e as any) }}
            >
                <div className='form-group'>
                    <label htmlFor="">Name</label><br />
                    <input type="text" id='name' name='name' />
                </div>
                <div className="form-group">
                    <label htmlFor="">Category</label><br />
                    <select name='categoryId'>
                        {
                            categories.map(category => <option key={Math.random() * Date.now()} value={(category as Category).id}>{(category as Category).title}</option>)
                        }
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor="">Description</label><br />
                    <input type="text" id='desc' name='desc' />
                </div>
                <div className='form-group'>
                    <label htmlFor="">Price</label><br />
                    <input type="text" id='price' name='price' />
                </div>
                {/* <div className='form-group'>
                    Avatar
                    <input name='imgs' id='imgs' type="file" onChange={(e) => {
                        if (e.target.files) {
                            if (e.target.files.length > 0) {
                                (imgPreviewRef.current! as HTMLImageElement).src = URL.createObjectURL(e.target.files[0]);
                                setAvatarFile(e.target.files[0]);
                               
                            }
                        }
                    }} />
                    <img ref={imgPreviewRef} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
                </div>
                <div className='form-group'>
                    Pictures
                    <input name="imgs" type="file" id='picture' multiple onChange={(e) => {
                        if (e.target.files) {
                            if (e.target.files.length > 0) {
                                let tempPictures: Picture[] = [];
                                for (let i in e.target.files) {
                                    if (i == "length") {
                                        break
                                    }
                                    tempPictures.push({
                                        file: e.target.files[i],
                                        url: URL.createObjectURL(e.target.files[i])
                                    })
                                }
                                setPictures(tempPictures)
                            }
                        }
                    }} />
                    <div style={{display:"flex"}}>
                        {
                            pictures.map(picture => <img key={Math.random() * Date.now()} src={picture.url} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />)
                        }
                    </div>
                </div> */}
                  <div>
        
        <div>
            <h4>Product Options </h4>
            <div>
                <div>
                    <label htmlFor="">Options Title</label> <br />
                    <input type="text" placeholder='enter text' name='option'/>
                </div>
                <div className='form-group'>
                    Pictures
                    <input name="imgs" type="file" id='picture' multiple onChange={(e) => {
                        if (e.target.files) {
                            if (e.target.files.length > 0) {
                                let tempPictures: Picture[] = [];
                                for (let i in e.target.files) {
                                    if (i == "length") {
                                        break
                                    }
                                    tempPictures.push({
                                        file: e.target.files[i],
                                        url: URL.createObjectURL(e.target.files[i])
                                    })
                                }
                                setPictures(tempPictures)
                                
                              
                            }
                        }
                    }} />
                    <div style={{ display: "flex" }}>
                        {
                            pictures.map(picture => <img key={Math.random() * Date.now()} src={picture.url} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />)
                        }
                    </div>
                </div>

            </div>
        </div>
    </div>
                <button type='submit' className='save-button'>
                    {loading ? <span className='loading-spinner'></span> : "Save"}
                </button>
            </form>
          
        </div>
    )
}