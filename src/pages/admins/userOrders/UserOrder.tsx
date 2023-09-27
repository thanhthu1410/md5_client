import { Link, useNavigate } from "react-router-dom"
import "./userOrder.scss"

export default function UserOrder() {
    const navigate = useNavigate()
  return (
  
    <div className='orders-wrapper'>
         <nav>
                <ol className='addProduct-nav'>
                    <li onClick={()=> navigate("/admin")}>Admin /</li>
                    <li className='add-title'>User-Order </li>
             
                </ol>
            </nav>
    <div className='orders-admin-box'>
        <div className='orders-title'><h2>Orders</h2><span></span></div>
    </div>
    <table>
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Customer</th>
                <th scope="col">Delivery Address</th>
                <th scope="col">Status</th>
                <th scope="col">Created</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
           
                <tr  className='order'>
                    <td>id</td>
                    <td>thanhthu9c@gmail.com</td>
                    <td>155 dvn</td>
                    <td>
                        <select disabled defaultValue="Pending">
                            <option value="PENDING">Pending</option>
                            <option value="ACCEPTED">Accepted</option>
                            <option value="SHIPPING">Shipping</option>
                            <option value="DONE">Done</option>
                        </select>
                    </td>
                    <td className='date'>create At : </td>
                    <td>
                        <span className="material-symbols-outlined" >
                            more_horiz
                        </span>
                    </td>
                </tr>
         
        </tbody>
    </table>
    <nav aria-label="Page navigation example page_box">
        <ul className="pagination">
            <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
           
            <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
 
</div>
)
  }