import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ellipsis from '../../utils/helpers';
import { WhiteText } from '../styled/Text';

const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const UserAccount = ({ address }) => {
  return (
    <AccountWrapper>
      <FontAwesomeIcon icon={['far', 'user']} size="2x" color="#fff" />
      <WhiteText>{ellipsis(address)}</WhiteText>
      <FontAwesomeIcon icon={['far', 'bell']} size="2x" color="#fff" />
    </AccountWrapper>
  );
};

UserAccount.propTypes = {
  address: PropTypes.string.isRequired,
};

export default UserAccount;
