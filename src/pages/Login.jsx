import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import BackgroundImage from "../components/BackgroundImage";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import loginBg from "../assets/netflix-login-bg.jpg";

function Login() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  })

  const [focus, setFocus] = useState({
    userLogin_emailLabel: false,
    userLogin_passLabel: false
  })
  const handleSignIn = async () =>{
    try {
      const { email, password } = formValue;
      await signInWithEmailAndPassword(firebaseAuth, email, password)
    } catch (error) {
      return error;
    }
  }
  
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if(currentUser) navigate("/")
  })

  return (
    <Container>
      <BackgroundImage backgroundImage={loginBg} />
      <div className="content">
        <Header login = {false} />
        <div className="form-container flex flex-column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Sign In</h3>
            </div>
            <div className="container flex column">
              <Lable className="userLogin_emailLabel" position={'relative'} onFocus={()=> {setFocus({
                ...focus, userLogin_emailLabel: true })}} onBlur={()=> {setFocus({
                ...focus, userLogin_emailLabel: false
                })}}>
              <input id="userLogin_email" type="email" name="email" defaultValue={formValue.email} onChange={(e)=>{ setFormValue({ 
                ...formValue, [e.target.name]: e.target.value
                })}} />
                <Lable className={`Login_labelPlace ${focus.userLogin_emailLabel ||formValue.email ? 'login_lablePlaceTransition' : ''}`} htmlFor="userLogin_email">Email or phone number</Lable>
              </Lable>
              <Lable className="userLogin_passLabel" position={'relative'} onFocus={()=> {setFocus({
                ...focus, userLogin_passLabel: true })}} onBlur={()=> {setFocus({
                ...focus, userLogin_passLabel: false
                })}}>    
              <input id="userLogin_password" type="password" name="password"  defaultValue={formValue.password} onChange={(e)=>{ setFormValue({ 
              ...formValue, [e.target.name]: e.target.value
                })}} />
                <Lable className={`Login_labelPlace ${focus.userLogin_passLabel || formValue.password ? 'login_lablePlaceTransition' : ''}`} htmlFor="userLogin_password">Password</Lable>
              </Lable>
              <button onClick={handleSignIn}>Sign In</button>
            </div>
            <div className="signUp_fromlogin">
              <span>New to Netflix? <Link to="/signup">Sign up now<span>.</span></Link></span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 5rem;
        border-radius: 3px;
        background-color: #000000cc;
        gap: 1rem;
        color: white;
        min-width: 500px;
        max-width: 300px;
        .title {
          margin-right: auto;
          h3 {
            font-size: 2.3rem;
          }
        }
        .container {
          gap: 1rem;
          width: 100%;
          input {
            width: 100%;
            border-radius: 5px;
            background: #342f2f;
            border: none;
            color: white;
            font-size: 1.2rem;
            padding: 1rem 1.4rem 0;
            height: 50px;
            &:focus {
              outline: none;
            }
          }
          .Login_labelPlace {
            position: absolute;
            top: 50%;
            left: 20px;
            transform: translateY(-50%);
            color: #a59b9b;
            transition: font 0.1s ease, top 0.1s ease, transform 0.1s ease;
          }
          .login_lablePlaceTransition {
            top: 4px;
            transform: translateY(0);
            font-size: 0.8rem;
          }
          button {
            margin-top: 2rem;
            padding: 1.2rem;
            background-color: #e50914;
            border: none;
            pointor: cursor;
            color: white;
            font-weight: bolder;
            font-size: 1.05rem;
            border-radius: 5px;
          }
        }
        .signUp_fromlogin {
          margin-right: auto;
          font-size: 1.1rem;
          span {
            color: #a59b9b;
          }
        }
      }
    }
  }

  @media (max-width: 820px) {
    .login_bg {
      object-fit: cover;
    }
    .content {
      grid-template-rows: 8vh 85vh;

      .form-container {
        align-items: flex-start;
        padding-top: 2rem;

        .form {
          padding: 4rem;
          .title {
            margin-bottom: 1rem;

            h3 {
              font-weight: 500;
            }
          }

          .container {
            gap: 1.2rem;
          }
        }
      }
    }
  }

  @media (max-width: 480px) {
    .content {
      background-color: rgba(0,0,0,1);
      grid-template-rows: 0vh 85vh;

      .header {
        position: absolute;
        padding: 0rem 1rem;

        .logo {
          padding-top: 1rem;
          img {
            height: 1.3rem;
          }
        }
      }

      .form-container {
        height: 100vh;

        .form {
          min-width: 100%;
          padding: 1.2rem;
          height: 100vh;
          justify-content: flex-start;
          margin-top: 10rem;

          .title {
            margin-bottom: 1rem;
            h3 {
              font-size: 2rem;
            }
          }
        }
      }
    }
  }
`;

const Lable = styled.label`
  position: ${(props => props.position)}`
export default Login;
