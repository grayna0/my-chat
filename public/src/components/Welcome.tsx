import React from "react";
import styled from "styled-components";
import loader from "../assets/loader.gif"
const Welcome = ({ currentUser }: { currentUser: any }) => {

  
  return (
    <Container  >
      <img src={loader} alt="loader" />
      <h1>
        Welcome, <span>{currentUser?.username}</span>
      </h1>
      <h3>Please select chat</h3>
    </Container >
  );
};

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
color: white;
flex-direction: column;
img {
  height: 20rem;
}
span {
  color: #4e0eff;
}
`;
export default Welcome;
