import styled from 'styled-components';
import { Modal } from 'react-bootstrap';

Modal.Header = styled(Modal.Header)`
  border-bottom: none;
`;

Modal.Body = styled(Modal.Body)`
  padding: 1rem 1rem 36px;
`;

Modal.Footer = styled(Modal.Footer)`
  border-top: none;
`;

export default Modal;
