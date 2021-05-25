import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ellipsis } from '../../utils/helpers';
import { White } from '../styled/Text';
import useThemeContext from '../../hooks/useThemeContext';
import { IconWrapper } from '../styled/Icon';

const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const UserAccount = ({ address }) => {
  const theme = useThemeContext();

  return (
    <AccountWrapper>
      <IconWrapper>
        <FontAwesomeIcon
          icon={['far', 'user']}
          size="1x"
          color={theme.darkBlue}
        />
      </IconWrapper>
      <White>{ellipsis(address)}</White>
    </AccountWrapper>
  );
};

UserAccount.propTypes = {
  address: PropTypes.string.isRequired,
};

export default UserAccount;
