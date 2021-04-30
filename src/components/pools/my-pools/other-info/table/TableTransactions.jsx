import React from 'react';
import PropTypes from 'prop-types';
import { Table as BTable } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useThemeContext from '../../../../../hooks/useThemeContext';
import { FlexCenter } from '../../../../styled/Flex';

const Tbl = styled(BTable)`
  margin-bottom: 0;
  text-align: left;
  font-size: ${({ theme }) => theme.fs14};
  background-color: transparent;
  border-collapse: separate;
  border-spacing: 0px 20px;
`;

Tbl.Tr = styled.tr`
  box-shadow: -10.814px 33.271px 105.358px rgba(126, 123, 160, 0.23);
  border-radius: 12px;
`;

Tbl.Td = styled.td`
  border: none !important;
  vertical-align: middle !important;
  padding: 1rem !important;
`;

const WrapIcon = styled(FlexCenter)`
  width: 25px;
  height: 25px;
  background-color: ${({ theme }) => theme.lightBlue};
  border-radius: 50%;
`;

const TableTransactions = ({ data }) => {
  const theme = useThemeContext();

  return (
    <Tbl>
      <tbody>
        {data.map((elem) => (
          <Tbl.Tr key={elem.id}>
            <Tbl.Td>
              <WrapIcon>
                <FontAwesomeIcon
                  icon={['fab', 'ethereum']}
                  color={theme.white}
                  style={{ verticalAlign: 'middle' }}
                />
              </WrapIcon>
            </Tbl.Td>
            <Tbl.Td>{elem.name}</Tbl.Td>
            <Tbl.Td>{elem.percent}%</Tbl.Td>
            <Tbl.Td>{elem.date}</Tbl.Td>
          </Tbl.Tr>
        ))}
      </tbody>
    </Tbl>
  );
};

TableTransactions.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableTransactions;
