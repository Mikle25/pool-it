import styled from 'styled-components';
import { FlexJustifyBetween } from './Flex';

const ContentWrap = styled.section`
  padding: 0 14vw 3vw;
  margin-top: 160px;

  @media (${({ theme }) => theme.xlDown}) {
    padding: 0 5vw 5vh;
    row-gap: 15vh;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;

const ContainerTable = styled.section`
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

export { BtnWrapper, ContainerTable, ContentWrap, Content };
