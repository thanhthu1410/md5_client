import "./admin.scss"
import api from "../../services/api";
import { useEffect, useRef, useState } from 'react'
import AdminCategory from "./categories/AdminCategory"
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface Category {
  id: string;
  title: string;
  avatar: string;
}
interface Picture {
  
  file: File;
  url: string;
}
export default function Admin() {

  return (
    <div className="admin-section">
     
        <div className="sidebar">
          <div className="logo">
            <img src="https://firebasestorage.googleapis.com/v0/b/md05furniturestore.appspot.com/o/test%2Flogo1.jpg?alt=media&token=9a98413d-b9d9-4506-bd3c-a414046dcf06&_gl=1*1ewf5zf*_ga*MTg1ODg5NjEyOS4xNjg4MDg4OTU3*_ga_CW55HF8NVT*MTY5NjMwMzMyMC41My4xLjE2OTYzMDM0OTQuNTEuMC4w" alt="logo" />
            <h2>FURNITURE</h2>
          </div>
          <ul className="links">
          <h4 onClick={()=> window.location.href = "/"}>HomePage </h4>
            
            <hr />
            <h4>Manage Products </h4>
            <li>
              <span className="material-symbols-outlined">dashboard</span>
              <Link to={"/admin"}>List Products</Link>
            </li>
            <li>
              <span className="material-symbols-outlined">show_chart</span>
              <Link to={"/admin/addProduct"}>Add Product</Link>
              
            </li>
            <li>
              <span className="material-symbols-outlined">flag</span>
              <Link to={"/admin/categories"}>List Categories</Link>
           
            </li>
            <hr />
           
            <hr />
            <h4>Manage Receipts </h4>
            <li>
              <span className="material-symbols-outlined">ambient_screen</span>
              <Link to={"/admin/receipt"}>Purchase</Link>
            </li>
            {/* <li>
              <span className="material-symbols-outlined">ambient_screen</span>
              <Link to={"/admin/user-receipt"}>User Receipts</Link>
            </li> */}
           
          </ul>
        </div>
    
      <div className="admin-content">
     
    
         <Outlet/>

      </div>
    </div>
  )
}
