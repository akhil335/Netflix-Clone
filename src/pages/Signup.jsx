import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import BackgroundImage from "../components/BackgroundImage";
import { firebaseAuth } from "../utils/firebase-config";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import signBg from "../assets/netflix-background.jpg"
import { PageTitle } from "../components/Helmet";

function Signup() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  })

  const handleSignIn = async () =>{
    try {
      const { email, password } = formValue;
      console.log(email, password, formValue);
      await createUserWithEmailAndPassword(firebaseAuth, email, password)
    } catch (error) {
      return error;
    }
  }
  
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if(currentUser) navigate("/")
  })
  return (
    <Container showPassword={showPassword}>
      <PageTitle title={"Netflix Clone | Signup"} />
      <BackgroundImage backgroundImage={signBg} />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more.</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h6>
          </div>
          <div className="form">
            <input type="email" name="email" placeholder="Email Address" defaultValue={formValue.email} onChange={(e)=>{ setFormValue({ 
              ...formValue, [e.target.name]: e.target.value
              })}} />
            { showPassword &&  <input type="password" name="password" placeholder="Password"  defaultValue={formValue.password} onChange={(e)=>{ setFormValue({ 
              ...formValue, [e.target.name]: e.target.value
              })}} />}
            { !showPassword && (
            <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </div>
          <button class="signIn" onClick={handleSignIn}>Sign Up</button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .login_bg {
    display: block;
  }
  .login_bg {
    object-fit: cover;
  }
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
        gap: 1rem;
        padding-top: 5rem;
        .text {
          gap: 1rem;
          max-width: 900px;
          margin: auto;
          text-align: center;
          h1 {
            font-size: 3.4rem;
            max-width: 640px;
            margin: auto;
          }
          h4 {
            font-weight: 500;
            font-size: 1.7rem;
            max-width: 640px;
            margin: auto;
          }
          h6 {
            font-weight: 500;
            font-size: 1.3rem;
            padding: 0 5%;
          }
        }
      .form {
        display: grid;
        grid-template-columns: ${({showPassword}) =>
        showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 68%; 
        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.6rem 5%;
          background-color: #e50914;
          border: none;
          pointor: cursor;
          color: white;
          font-size: 2rem;
          font-weight: 500;
        }
      }
    .signIn {
        padding: 0.7rem 1.3rem;
        background-color: #e50914;
        border: none;
        pointor: cursor;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
        margin-bottom: 1rem;
      }
    }
  }

  @media (max-width: 480px) {
    .content {
      grid-template-rows: 10vh 90vh;

      .logo {
        img {
          height: 2rem;
        }
      }
      .header {
        padding: 0rem 1rem;
      }
      .body {
        padding-top: 0rem;
        .text {
          max-width: 100%;
          padding: 1rem;
          margin: inherit;

          h1 {
            font-size: 1.8rem;
          }
          h4 {
            font-size: 1.1rem;
          }
          h6 {
            font-size: 0.9rem;
          }
        }
        .form {
          width: 100%;
          padding: 1rem;
          grid-template-columns: ${({showPassword}) =>
          showPassword ? "1fr" : "1fr 1fr"};
          gap: ${({showPassword}) =>
          showPassword ? "0.5rem" : "0"};;
          input {
            padding: 1rem 5%;
          }
          button {      
            padding: 0rem;
            font-size: 1rem;
          }
        }
        button {      
          padding: 1rem;
          font-size: 1rem;
        }
      }
    }
  }
  @media (max-width: 920px) {
    html, body {
      font-size: 52%

    }
    }
`;

export default Signup;
