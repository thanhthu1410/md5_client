import React, { useState, useEffect } from 'react';
import './login.scss'; // Make sure to adjust the path to your CSS file accordingly
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import api from "../../services/api/index"
import ResetPassword from '../resetPasswods/ResetPasswordModal';
import { useDispatch } from 'react-redux';
import { userAction } from '@/stores/slice/user';
interface Props{
  handleClose: any
}
const LoginSignin = (props: Props) => {
  const dispatch = useDispatch()

  const { t } = useTranslation()
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSignupClick = () => {
    const loginForm = document.querySelector("form.login") as HTMLFormElement;
    const loginText = document.querySelector(".title-text .login") as HTMLElement;

    if (loginForm && loginText) {
      loginForm.style.marginLeft = "-50%";
      loginText.style.marginLeft = "-50%";
    }
  };

  const handleLoginClick = () => {
    const loginForm = document.querySelector("form.login") as HTMLFormElement;
    const loginText = document.querySelector(".title-text .login") as HTMLElement;

    if (loginForm && loginText) {
      loginForm.style.marginLeft = "0%";
      loginText.style.marginLeft = "0%";
    }
  };

  const handleSignupLinkClick = (event: React.MouseEvent) => {
    handleSignupClick();
    event.preventDefault();
  };

  function isValidEmail(email: any) {
    // You can implement your email validation logic here
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  const validateEmail = (email: any) => {
    
    if (!isValidEmail(email)) {
      setEmailError(t("validateEmail"));
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };
  const validateUserName = (userName: any) => {
    if (userName.length < 3) {
      setUserNameError(t("validateUserName"));
      return false;
    } else {
      setUserNameError('');
      return true;
    }
  };
  const validatePassword = (password: any) => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };
  async function handleRegister(e: any) {
    e.preventDefault();
    const newUser = {
      user_name: e.target.user_name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    }
    const confirmPass = e.target.confirmpassword.value
    if (newUser.password !== confirmPass) {
      message.error({content: "Incorect Confirm Password ! ",
        className : "custom-message"
        })
      setLoading(false)
      return;
    }
    setLoading(true);
    await api.users.register(newUser)
      .then(res => {
        console.log("res", res)
        if (res.status == 200) {
          message.success({content: res.data.message,
            className : "custom-message1"
            })
          handleLoginClick()

        }
        if(res.response.status == 400) {
          if (Array.isArray(res.response.data.message)) {
            message.warning({content: res.response.data.message[0],
            className : "custom-message"})
            setLoading(false)
          }else{
            message.warning("Username or Email is already exist")
            setLoading(false)
          }

        
        }
      }
      )
      .catch(err => {
        console.log("err register", err)
        setLoading(false)
      })
  }
  async function hanldLogin(e: any) {
    e.preventDefault();
    const newUser = {
      user_name: e.target.user_name.value,
      password: e.target.password.value,
    };
     setLoading(true);
     await api.users.login(newUser)
     .then(res => {
      console.log("res",res);
      if(res.status == 200){
        message.success({
          content: 'Login Successfull !',
          className: 'custom-message'
        })
        
        localStorage.setItem("token",res.data.token);
        dispatch(userAction.reload())
        
        setTimeout(()=>{
            props.handleClose()
            
        },1500)
    
      }else{
        message.warning({content :res.response.data.message,
        className: "custom-message"})
        setLoading(false)
      }
      setLoading(false);
     }
      )
     .catch(err => console.log("err",err)
     )
  }
  return (
    <div className="wrapper">
      <div className="title-text">
        <div className="title login">
          {t("login")}
        </div>
        <div className="title signup">
          {t("createAccount")}
        </div>
      </div>
      <div className="form-container">

        <div className="slide-controls">

          <input type="radio" name="slide" id="login" defaultChecked />
          <input type="radio" name="slide" id="signup" />
          <label htmlFor="login" className="slide login" onClick={handleLoginClick}> {t("login")}</label>
          <label htmlFor="signup" className="slide signup" onClick={handleSignupClick}>  {t("createAccount")}</label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-inner">
          <form className="login" onSubmit={(e)=> hanldLogin(e)}>
            <div className="field">
              <input type="text" name='user_name' placeholder={`${t("emailOrUsername")}`} required />
            </div>
            <div className="field">
              <input type="password" name='password' placeholder={`${t("password")}`} required />

            </div>
            <div className="pass-link">
              <a href="#">{t("loginWith")} </a>
              <img src="https://www.hieuhien.vn/wp-content/uploads/2019/01/google-chinh-thuc-doi-logo-moi-7634.jpg" alt="" />
            </div>
            
          
            <ResetPassword/>
            <div className="field btn">
              <div className="btn-layer"></div>
              {loading ? <span className='loading-spinner'></span> : <input type="submit" value={t("login")} />}

            </div>
            <div className="signup-link">
              {t("notMember")}? <a href="#" onClick={handleSignupLinkClick}>{t("signinHere")}</a>
            </div>
          </form>
          <form className="signup" onSubmit={(e) => handleRegister(e)}>
            <div className="field">
              <input type="text" name='email' placeholder={`${t("email")}`} onChange={(e) => validateEmail(e.target.value)} required />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
            <div className="field">
              <input type="text" name='user_name' placeholder={`${t("username")}`} onChange={(e) => validateUserName(e.target.value)} required />
              {userNameError && <p className="error-message">{userNameError}</p>}
            </div>
            <div className="field">
              <input type="password" name='password' placeholder={`${t("password")}`} onChange={(e) => validatePassword(e.target.value)} required />
              {passwordError && <p className="error-message">{passwordError}</p>}
            </div>
            <div className="field">
              <input type="password" name='confirmpassword' placeholder={`${t("confirmPass")}`} required />
            </div>
            <div className="field btn">
              <div className="btn-layer"></div>
              {loading ? <span className='loading-spinner'></span> : <input type="submit" value={t("createAccount")} />}
            </div>
            <div className="signup-link">
              {t("descRegister")}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginSignin;
