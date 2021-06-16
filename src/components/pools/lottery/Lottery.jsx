import React from 'react';
import { FormControl, InputGroup, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { ContainerTable } from '../../styled/Wrappers';
import TableCards from '../../TableCards';
import CardLottery from './CardLottery';
import {
  useLotteryDispatchContext,
  useLotteryStateContext,
} from '../../../store/lotteryContext';
import useThemeContext from '../../../hooks/useThemeContext';

const InpGroup = styled(InputGroup)`
  min-height: 40px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.blue};
  border-radius: ${({ theme }) => theme.radiusCard};
  padding: 0 25px;
`;

const Input = styled(FormControl)`
  background-color: transparent;
  border: 0;
  font-size: ${({ theme }) => theme.fs12};
  color: ${({ theme }) => theme.blue};

  &:focus {
    background-color: transparent;
  }
`;

const Lottery = () => {
  const { dataLottery, isLoad } = useLotteryStateContext();
  const { getData } = useLotteryDispatchContext();
  const theme = useThemeContext();

  return (
    <ContainerTable>
      {isLoad && <Spinner animation="border" variant="primary" />}

      <TableCards
        rows={dataLottery || []}
        rowKey="id"
        loading={isLoad}
        getData={getData}
        content={(pool) => <CardLottery pool={pool} />}
      />

      <InpGroup>
        <InputGroup.Prepend>
          <FontAwesomeIcon icon="search" color={theme.blue} />
        </InputGroup.Prepend>

        <Input placeholder="Search pool" aria-label="Search pool" />
      </InpGroup>
    </ContainerTable>
  );
};

export default Lottery;
