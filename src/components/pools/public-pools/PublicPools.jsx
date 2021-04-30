import React from 'react';
import styled from 'styled-components';
import { FormControl, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TableCards from '../../TableCards';
import BtnCreateNewPool from '../../BtnCreateNewPool';
import useThemeContext from '../../../hooks/useThemeContext';
import CardPublicPool from './CardPublicPool';
import { ContainerPools } from '../../styled/Wrappers';

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

const MockData = [
  {
    id: 1,
    name: 'DFAR pool №1',
    total: 3243424,
    active: 'Active',
  },
  {
    id: 2,
    name: 'DFAR pool №1',
    total: 3243424,
    active: 'Active',
  },
  {
    id: 3,
    name: 'DFAR pool №1',
    total: 3243424,
    active: 'Active',
  },
  {
    id: 4,
    name: 'DFAR pool №1',
    total: 3243424,
    active: 'Active',
  },
  {
    id: 5,
    name: 'DFAR pool №1',
    total: 3243424,
    active: 'Active',
  },
  {
    id: 6,
    name: 'DFAR pool №1',
    total: 3243424,
    active: 'Active',
  },
  {
    id: 7,
    name: 'DFAR pool №1',
    total: 3243424,
    active: 'Active',
  },
];

const PublicPools = () => {
  const theme = useThemeContext();

  return (
    <ContainerPools>
      <TableCards
        rows={MockData}
        rowKey="id"
        maxHeight="900px"
        content={(row) => <CardPublicPool row={row} />}
      />

      <InpGroup>
        <InputGroup.Prepend>
          <FontAwesomeIcon icon="search" color={theme.blue} />
        </InputGroup.Prepend>

        <Input placeholder="Search pool" aria-label="Search pool" />
      </InpGroup>

      <BtnCreateNewPool />
    </ContainerPools>
  );
};

export default PublicPools;
