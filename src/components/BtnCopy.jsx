import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { BtnLink } from './styled/Btns';

const copy = (msg) => toast.success(msg);
// eslint-disable-next-line no-unused-vars,react/prop-types
const BtnCopy = ({ textToCopy, msg, style }) => (
  <CopyToClipboard text={textToCopy}>
    <BtnLink style={{ ...style, lineHeight: '1' }} onClick={() => copy(msg)}>
      <FontAwesomeIcon icon="copy" style={{ pointerEvents: 'none' }} />
    </BtnLink>
  </CopyToClipboard>
);

BtnCopy.propTypes = {
  textToCopy: PropTypes.string.isRequired,
  msg: PropTypes.string,
};

BtnCopy.defaultProps = {
  msg: 'Link copied',
};

export default BtnCopy;
