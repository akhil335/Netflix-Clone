import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg"

function Header(props) {
  const navigate = useNavigate();
  return (
   <Container login = {props.login} className="header flex a-center j-between">
    <div className="logo">
      <img src={logo} alt="logo" />
    </div>
    {props.login && 
     <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
     Login
     </button>
     }
   </Container>
  );
}

const Container = styled.div`
  padding: ${props => props.login ? "0rem 4rem" : "0rem 2rem"};
  .logo {
    img {
      height: ${props => props.login ? "2.5rem" : "3.2rem"};
    }
  }
  button {
    padding: 0.7rem 1.3rem;
    background-color: #e50914;
    border: none;
    pointor: cursor;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }`;
export default Header;