import React from 'react';
import styled from "styled-components";


const Container = styled.div`
  height: 100vh;
  background-size: cover;
  display: flex;
  flex-flow: ${props => props.flow || 'row' };
  background-image: url('${props => props.src || ''}');
`;

const Background = (props) => (
  <Container src={props.src}>
    {props.children}
  </Container>
);

export default Background;
