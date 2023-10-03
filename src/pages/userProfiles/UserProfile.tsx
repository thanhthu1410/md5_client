import React, { useContext, useEffect, useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,

} from 'mdb-react-ui-kit';
import ChangePassword from './ChagePassword'
import ChangeInfo from './ChangeInfor'
import "./auth.scss"
import { StoreType } from '../../stores';
import { useSelector } from 'react-redux';
import api from '@/services/api';
import { message } from 'antd';
export default function ProfilePage() {

  const userStore = useSelector((store : StoreType)=> store.userStore)
  const[email,setEmail] = useState<string | null>(null)
  useEffect(()=>{
    if(userStore.data) {
      setEmail(userStore.data!.email)
    }   
    console.log("userStore",userStore.data);
    
  },[userStore.data])
  
  const [hiddenEmail, setHiddenEmail] = useState(""); // Initialize with an empty string

  useEffect(() => {
    if(email) {
      async function hideEmail() {
        if (email) {
          const parts = await email.split('@');
          const username = parts[0];
          const domain = parts[1];
          if (username.length > 4) {
            const visiblePart = username.slice(0, 2);
            const hiddenPart = '*'.repeat(username.length - 4);
            setHiddenEmail(`${visiblePart}${hiddenPart}${username.slice(-3)}@${domain}`);
          } else {
            setHiddenEmail(email);
          }
        }
      }
      hideEmail();
    }
  }, [email]);
  async function resendEmail() {
    api.users.resendEmail()
    .then(res => message.success("Check your email"))
    .catch(err => console.log("err",err))
    
}
    

  return (
    <div>
      <div>
        <img className='imgbn' src="./images/title.webp" alt="" />
      </div>
        <section>
      <MDBContainer className="py-5">
      
      {
        <MDBRow>
        <MDBCol lg="4">
          <MDBCard className="mb-4">
            <MDBCardBody className="text-center">
              <MDBCardImage
                src={userStore?.data?.avatar}
                alt=""
                className="rounded-circle"
                style={{ height: '250px' }}
                fluid />
            
              <p className="text-muted mb-4">{userStore?.data?.user_name}</p>
              <div className="d-flex justify-content-center mb-2">
               
                <button  className="ms-1"><ChangeInfo/></button>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol lg="8" >
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>User Name:</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{userStore.data?.user_name}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
             
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Email</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  {/* <MDBCardText className="text-muted">{hiddenEmail}</MDBCardText> */}
                  <MDBCardText className="text-muted">{hiddenEmail}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
             
             <MDBRow>
               <MDBCol sm="3">
                 <MDBCardText>Address</MDBCardText>
               </MDBCol>
               <MDBCol sm="9">
                 {/* <MDBCardText className="text-muted">{hiddenEmail}</MDBCardText> */}
                 <MDBCardText className="text-muted">{userStore.data?.address}</MDBCardText>
               </MDBCol>
             </MDBRow>
              <hr />     
            <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Phone Number </MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{userStore.data?.phone_number}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr/>


              {userStore.data?.emailAuthentication === false ?     
              <MDBRow>
               <MDBCol sm="3">
                 <MDBCardText>  </MDBCardText>
               </MDBCol>
               <MDBCol sm="9">
                 {/* <MDBCardText className="text-muted">{hiddenEmail}</MDBCardText> */}
                 <MDBCardText className="text-muted"> <p>Resend Email In <span style={{ color: "red", cursor: "pointer" }} onClick={() => resendEmail()}>Here</span> !</p></MDBCardText>
               </MDBCol>
             </MDBRow>
               
              : <></>}
              
              <button type="button" className="btn btn-secondary"><ChangePassword/></button>
            </MDBCardBody>
           
          </MDBCard>

       
        </MDBCol>
      </MDBRow> 
      }
        
      </MDBContainer>
    </section>
    </div>
  );
}