import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const LinkRout = styled(NavLink)`
  color: ${({ theme }) => theme.blue};
  font-weight: 700;
  padding: 0 10px;
  border-bottom: 2px solid transparent;

  &:hover {
    text-decoration: none;
  }
  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.blue};
  }
`;

export default LinkRout;
