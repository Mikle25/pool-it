import React from 'react';
import styled from 'styled-components';
import ContentHeader from './content/ContentHeader';
import Middle from './content/Middle';
import ContentFooter from './content/ContentFooter';

const BodyWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 150px auto 50px;
`;

const Body = () => {
  return (
    <BodyWrapper>
      <ContentHeader />
      <Middle />
      <ContentFooter />
    </BodyWrapper>
  );
};

export default Body;
