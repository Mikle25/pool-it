import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Btn } from '../../styled/Btn';
import { FlexAlignItemsCenter } from '../../styled/Flex';
import useThemeContext from '../../../hooks/useThemeContext';
import { randomColor } from '../../../utils/helpers';
import { IconWrapper } from '../../styled/Icon';
import TblCards from '../../styled/TblCards';
import { LightBlue } from '../../styled/Text';

const Total = styled(FlexAlignItemsCenter)`
  min-width: fit-content;
  justify-content: space-between;
  border: 2px solid ${({ theme }) => theme.lightBlue};
  border-radius: 30px;
  padding: 5px 25px;
  column-gap: 2vw;
`;

const TotalWrap = styled(FlexAlignItemsCenter)`
  gap: 20px;
  flex: 3 1 auto;

  .item {
    width: 40%;
  }

  @media (${({ theme }) => theme.mdDown}) {
    flex-wrap: wrap;
    .item {
      width: 100%;
    }
  }
`;

const BodyCardName = styled(FlexAlignItemsCenter)`
  overflow-wrap: anywhere;
  gap: 2vw;
  flex: 0 0 200px;
`;

const CardPublicPool = ({ row }) => {
  const theme = useThemeContext();

  return (
    <>
      <TblCards.Header>
        <span className="active">{row.active}</span>
        <span>Public</span>
      </TblCards.Header>

      <TblCards.Body>
        <BodyCardName>
          <IconWrapper bgColor={randomColor}>
            <FontAwesomeIcon
              icon={['fab', 'ethereum']}
              color={theme.white}
              style={{ verticalAlign: 'middle' }}
            />
          </IconWrapper>

          <LightBlue>{row.name}</LightBlue>
        </BodyCardName>

        <TotalWrap>
          <Total className="item">
            <div>Total deposits:</div>
            <div>{row.total}</div>
          </Total>

          <Btn className="item" fs={theme.fs14}>
            Connect to pool
          </Btn>
        </TotalWrap>
      </TblCards.Body>

      <TblCards.Footer>
        <div>View pool</div>
      </TblCards.Footer>
    </>
  );
};

CardPublicPool.propTypes = {
  row: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CardPublicPool;
