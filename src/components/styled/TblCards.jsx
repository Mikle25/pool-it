import styled from 'styled-components';
import { FlexAlignItemsCenter } from './Flex';

const TblCards = styled.div`
  width: 100%;
  max-height: ${({ maxHeight }) => maxHeight || '100%'};
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding-bottom: 10px;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

TblCards.Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 3vw;
  row-gap: 1rem;

  box-shadow: ${({ theme }) => theme.tableRowShadow};
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: ${({ theme }) => theme.radiusCard};
  font-size: ${({ theme }) => theme.fs18};
  color: ${({ theme }) => theme.blue};
  border-radius: ${({ theme }) => theme.radiusCard};
`;

TblCards.Header = styled(FlexAlignItemsCenter)`
  justify-content: space-between;

  .active {
    background: #e0f4f9;
    color: ${({ theme }) => theme.purple};
    border-radius: ${({ theme }) => theme.radiusCard};
    padding: 0 10px;
    font-size: ${({ theme }) => theme.fs12};
    font-weight: 500;
  }

  & {
    color: ${({ theme }) => theme.lightBlue};
  }
`;

TblCards.Body = styled(FlexAlignItemsCenter)`
  gap: 2vw;

  @media (${({ theme }) => theme.lgDown}) {
    flex-wrap: wrap;
  }
`;

TblCards.Footer = styled(FlexAlignItemsCenter)`
  justify-content: flex-end;
  flex-wrap: wrap;
  column-gap: 10vw;

  .btn-size {
    width: 40%;
  }

  @media (${({ theme }) => theme.mdDown}) {
    flex-direction: column;
    align-items: flex-end;
    row-gap: 1rem;

    .btn-size {
      width: 100%;
    }
  }
`;

export default TblCards;
