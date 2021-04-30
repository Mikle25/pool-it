import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const Btn = styled(Button)`
   {
    min-width: fit-content;
    padding: 10px calc(${({ theme }) => theme.radiusButton} / 2);
    border-radius: ${({ theme }) => theme.radiusButton};
    background-color: ${({ theme, bg }) => bg || theme.blue};
    color: ${({ theme, color }) => color || theme.white};
    font-size: ${({ theme, fs }) => fs || theme.fs18};
    border: ${({ theme }) => theme.borderButton};
    box-shadow: ${({ theme }) => theme.buttonShadow};

    @media (${({ theme }) => theme.xlDown}) {
      font-size: ${({ theme }) => theme.fs14};
    }

    &:hover,
    &:focus,
    &:not(:disabled):not(.disabled):active {
      background-color: ${({ theme }) => theme.skyBlue};
      color: ${({ theme }) => theme.blue};
    }
  }
`;

const BtnWhite = styled(Btn)`
  padding: 10px calc(${({ theme }) => theme.radiusButton} / 2);
  background-color: ${({ theme, bg }) => bg || theme.white};
  color: ${({ theme }) => theme.blue};
`;

const BtnSkyBlue = styled(Btn)`
  background-color: ${({ theme }) => theme.skyBlue};
  color: ${({ theme }) => theme.blue};

  &:hover,
  &:focus,
  &:not(:disabled):not(.disabled):active {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }
`;

const BtnBig = styled(Btn)`
  width: 100%;
`;

const BtnBigSkyBlue = styled(BtnSkyBlue)`
  width: 100%;
`;

export { BtnSkyBlue, BtnBig, BtnBigSkyBlue, BtnWhite, Btn };
