import styled from 'styled-components';

const Card = styled.div`
  background-color: ${({ theme, bg }) => bg || theme.skyBlue};
  border-radius: ${({ theme }) => theme.radiusButton};
  width: ${({ w }) => w || 'fit-content'};
  min-height: ${({ h }) => h || 'fit-content'};
  max-width: 720px;
`;

export default Card;
