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

const IconWrapper = styled.div`
  width: fit-content;
  padding: 0.375rem 0.75rem;
  border-radius: 50%;
  background-color: ${({ theme, bgColor }) => bgColor || theme.white};
`;

export { IconColor, IconMedia, IconWrapper };
