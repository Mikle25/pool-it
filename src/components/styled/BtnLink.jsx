import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const BtnLink = styled(Button).attrs({ variant: 'link' })`
  color: ${({ theme }) => theme.lightBlue};
  font-weight: 700;

  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`;

export default BtnLink;
