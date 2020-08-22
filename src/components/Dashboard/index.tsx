import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import Personas from '../Personas';
import Background from '../Utils/Background';
import { NavBasicExample } from '../Navigation';
import styled from "styled-components";
import { Text } from 'office-ui-fabric-react/lib/Text';

const image = 'assets/bg-1.jpg';

const Panel = styled.div`
  left: 0px;
  width: 350px;
  background-color: #fff;
  position: relative;
  height: 100%;
  padding:  1em;
  box-shadow: 0px 0px 20px rgba(0,0,0,.4);
`;

const Content = styled.div`
  padding:  1em;
`;

const Dashboard = () => (
  <Background src={image}>
    <Panel>
      <Text variant="large"><b>Personas</b></Text>
      <NavBasicExample />
    </Panel>
    <Content>
      <h1>Dasboard Page</h1>
      <p>The Dasboard Page is accessible by every signed in user.</p>
      <Personas />
    </Content>
  </Background>
);

const condition = (authUser: any) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(Dashboard);
