import React from 'react';
import styled from 'styled-components';
import { FlexCenter } from '../components/styled/Flex';

const NotFoundWrap = styled(FlexCenter)`
  height: 100vh;
`;

const NotFound = () => {
  return <NotFoundWrap>Not Found</NotFoundWrap>;
};

export default NotFound;
