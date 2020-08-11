import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import Personas from '../Personas';
import Background from '../Utils/Background';

const image = 'assets/bg-4.jpg';

const Dashboard = () => (
  <Background src={image}>
    <h1>Dasboard Page</h1>
    <p>The Dasboard Page is accessible by every signed in user.</p>

    <Personas />
  </Background>
);

const condition = (authUser: any) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(Dashboard);
