import React from 'react';
import styled from 'styled-components';
import Header from './content/Header';
import Middle from './content/Middle';
import Footer from './content/Footer';

const BodyWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 10px;
`;

const Body = () => {
  return (
    <BodyWrapper>
      <Header />
      <Middle />
      <Footer />
    </BodyWrapper>
  );
};

export default Body;
