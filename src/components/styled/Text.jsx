import styled, { css } from 'styled-components';

const TextStyle = css`
  margin: 0;
  color: ${({ theme, color }) => color || theme.lightBlue};
  font-size: ${({ theme, fs }) => fs || theme.fs60};
  font-weight: ${({ fw }) => fw || 700};
`;

const Title = styled.h1`
  ${TextStyle}

  @media (${({ theme }) => theme.xlDown}) {
    font-size: ${({ theme }) => theme.fs36};
  }
`;

const SubTitle = styled.h2`
  ${TextStyle}
  @media (${({ theme }) => theme.xlDown}) {
    font-size: ${({ theme }) => theme.fs24};
  }
`;

const Text = styled.p`
  margin: 0;
  color: ${({ theme, color }) => color || theme.blue};
  font-size: ${({ theme, fs }) => fs || theme.fs18};
  font-weight: ${({ fw }) => fw || 400};

  @media (${({ theme }) => theme.xlDown}) {
    font-size: ${({ theme }) => theme.fs18};
  }
`;

export { Title, SubTitle, Text };
