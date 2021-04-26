import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`        
  body {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    font-size: ${({ theme }) => theme.fs18};
    color: ${({ theme }) => theme.lightBlue};
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.skyBlue};
    line-height: 1.2;
  }
  
  a {
    color: ${({ theme }) => theme.white};
    &:hover {
      text-decoration: none;
    }
  }

  button {
    letter-spacing: 0.75px;
  }
`;
