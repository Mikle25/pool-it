import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const Btn = styled(Button)`
   {
    padding: 10px calc(${({ theme }) => theme.radiusButton} / 2);
    border-radius: ${({ theme }) => theme.radiusButton};
    background-color: ${({ theme, bg }) => bg || theme.blue};
    color: ${({ theme, color }) => color || theme.white};
    font-size: ${({ theme, fs }) => fs || theme.fs18};
    border: ${({ theme }) => theme.borderButton};

    @media (${({ theme }) => theme.xlDown}) {
      font-size: ${({ theme }) => theme.fs18};
    }

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
  }
`;

const BtnSkyBlue = styled(Btn)`
  background-color: ${({ theme }) => theme.skyBlue};
  color: ${({ theme }) => theme.blue};

  &:hover {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }

  &:focus {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }

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

export { Btn, BtnSkyBlue, BtnBig, BtnBigSkyBlue };
