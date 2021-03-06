import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toastr = styled(ToastContainer)`
  .Toastify__toast {
    min-height: 65px;
    padding: 5px 20px;
    border-radius: 5px;

    font-family: Roboto, sans-serif;
    font-size: ${({ theme }) => theme.fs14};
  }

  .Toastify__toast--success {
    background: ${({ theme }) => theme.green};
  }

  .Toastify__toast--error {
    background: #f00;
  }

  .Toastify__close-button {
    outline: none;
  }
`;

export default Toastr;
