import React from 'react';

import { withFirebase } from '../Firebase';
import { Text } from 'office-ui-fabric-react/lib/Text';
import styled from "styled-components";
import { getTheme } from 'office-ui-fabric-react/lib/Styling';
const theme = getTheme();

const LogoutText = styled(Text)`
  display: block;
  padding: .5em;
  cursor: pointer;
  transition: all .3s ease-in-out;
  &:hover {
    background-color: #E74856;
    color: #FFF;
  }
`
const SignOutButton = ({ firebase }) => (
  <LogoutText onClick={firebase.doSignOut}>
    Cerrar sesión
  </LogoutText>
);

export default withFirebase(SignOutButton);
