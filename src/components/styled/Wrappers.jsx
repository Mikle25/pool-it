import styled from 'styled-components';
import { FlexJustifyBetween } from './Flex';

const ContainerPools = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 3vw;

  @media (${({ theme }) => theme.smDown}) {
    row-gap: 10vw;
  }
`;

const BtnWrapper = styled(FlexJustifyBetween)`
  column-gap: 5vw;
  @media (${({ theme }) => theme.smDown}) {
    flex-wrap: wrap;
    row-gap: 5vw;
  }
`;

export { BtnWrapper, ContainerPools };
