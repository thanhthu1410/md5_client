import React, { useEffect, useState ,useRef} from 'react';
import "./adminCategory.scss";
import axios from 'axios';
import { message } from 'antd';
import api from '@services/api';
import fs from 'fs';
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

export default function categories() {
  const navigate = useNavigate()
  const imgPreviewRef = useRef();
  const [categories, setCategories] = useState([]);
 
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const store = useSelector(store => store) as StoreType;

 useEffect(()=>{
  api.categories.findMany()
  .then(res => {

    setCategories(res.data.data);
    console.log("categories",categories);
  })
  .catch(err => console.log(err)
  )
 },[])


  function addNewCategory (e: FormDataEvent) {
  
    e.preventDefault();
    let formData = new FormData();
   
    if((e.target as any).title.value == ""){
      message.error("Please Enter Name Category ! ")
    }else{
      console.log('new category',(e.target as any).title.value)
      let newCategory = {
        title:(e.target as any).title.value
      }
      formData.append("title", JSON.stringify(newCategory))
      formData.append("avatar", avatarFile!)
      
      
      api.categories.create(formData)
          .then((res: any) => {
              console.log("res", res)
              message.success("Add New Category Successfull ! ")
              
              api.categories.findMany()
              .then(res => {
    
                setCategories(res.data.data);
                console.log("categories",categories);
                (document.getElementById("title") as HTMLInputElement
                ).value = "";
                (document.getElementById("avatar") as HTMLInputElement
                ).value = "";
                
              })
              .catch(err => console.log(err)
              )
          })
          .catch((err: any) => {
  
          }) 

          
  }}

  return (
    <div style={{paddingTop:"50px"}}>
    <nav>
                <ol className='addProduct-nav'>
                    <li onClick={()=> navigate("/admin")}>Admin /</li>
                    <li className='add-title'>List Categories </li>
             
                </ol>
            </nav>
      <div className='admin_categories'>
       
      
      <div style={{width:"50%"}} className='category-container'>
      <h2 style={{marginLeft:"10px"}}>List Categories </h2>
        <div className='category_item'>
       
          {categories?.map((item)=>(
               <p key={Math.random() * Date.now()}>{(item as Category).title} <img className='imgCategory' src={(item as Category).avatar} alt="" /></p>
          ))}
         
        </div>
      </div>
        <div className='add_categories'>
          <h2>ADD NEW CATEGORY</h2>
          <div className='form_add'>
           <form  onSubmit={(e) => addNewCategory(e as any)}>
              <label htmlFor=""> Name : </label>
              <input type="text" id='title' name='title' style={{borderBottom:"1px solid",color:"black"}} placeholder='Enter category name .... ' />
            <button type='submit'> Add   </button>
            <div className='form-group'>
                    Avatar
                    <input name='imgs' id='avatar' type="file" onChange={(e) => {
                        if (e.target.files) {
                            if (e.target.files.length > 0) {
                                (imgPreviewRef.current! as HTMLImageElement).src = URL.createObjectURL(e.target.files[0]);
                                setAvatarFile(e.target.files[0])
                            }
                        }
                    }} />
                    <img ref={imgPreviewRef} id='picture' style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
                </div>
              
          </form>
          </div>
         
        </div>
    </div>
    </div>
  
  )
}
