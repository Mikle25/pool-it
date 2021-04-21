import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconColor = styled(FontAwesomeIcon)`
  color: ${({ theme, color }) => color || theme.lightBlue};
`;

const IconMedia = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.white};

  &:hover {
    color: ${({ theme }) => theme.darkBlue};
  }
`;

export { IconColor, IconMedia };
