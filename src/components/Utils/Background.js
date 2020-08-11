import React from 'react';

const Background = (props) => (
  <div style={{
      border: '1px solid transparent', 
      height: '100vh',
      backgroundSize: 'cover',
      backgroundImage: `url(${props.src})`,
    }}>
    {props.children}
  </div>
);

export default Background;
