import React from "react";
import styled from "styled-components";

function BackgroundImage(props) {
  return (
   <Container>
    <img className="login_bg" src={props.backgroundImage} alt="netflix background" />
   </Container>
  );
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
    img {
        width: 100%;
        height: 100%;
    }
    `

export default BackgroundImage;