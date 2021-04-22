import styled from 'styled-components';
import { FlexJustifyBetween } from './Flex';

const BtnWrapper = styled(FlexJustifyBetween)`
  column-gap: 5vw;
  @media (${({ theme }) => theme.smDown}) {
    flex-wrap: wrap;
    row-gap: 5vw;
  }
`;

export default BtnWrapper;
