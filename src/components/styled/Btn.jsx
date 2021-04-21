import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const Btn = styled(Button)`
  width: fit-content;
  min-width: 200px;
  padding: 10px calc(${({ theme }) => theme.radiusButton} / 2);
  border-radius: ${({ theme }) => theme.radiusButton};
  background-color: ${({ theme, bg }) => bg || theme.white};
  color: ${({ theme, color }) => color || theme.blue};
  font-size: ${({ theme, fs }) => fs || theme.fs18};
  border: 0;

  &:hover {
    background-color: ${({ theme }) => theme.skyBlue};
    color: ${({ theme }) => theme.blue};
  }

  &:focus {
    background-color: ${({ theme }) => theme.skyBlue};
    color: ${({ theme }) => theme.blue};
  }

  &:not(:disabled):not(.disabled):active {
    background-color: ${({ theme }) => theme.skyBlue};
    color: ${({ theme }) => theme.blue};
  }
`;

const BtnMoreInfo = styled(Btn)`
  @media (${({ theme }) => theme.xlDown}) {
    font-size: ${({ theme }) => theme.fs24};
  }

  &:hover {
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.blue};
  }

  &:focus {
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.blue};
  }

  &:not(:disabled):not(.disabled):active {
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.blue};
  }
`;

export { Btn, BtnMoreInfo };
