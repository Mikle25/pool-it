import styled from 'styled-components';

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fs48};
  font-weight: ${({ fw }) => fw || 700};
  color: ${({ theme }) => theme.blue};

  @media (${({ theme }) => theme.xlDown}) {
    font-size: ${({ theme }) => theme.fs36};
  }

  @media (${({ theme }) => theme.mdDown}) {
    font-size: ${({ theme }) => theme.fs24};
  }
`;

const SubTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme, fs }) => fs || theme.fs36};
  font-weight: ${({ fw }) => fw || 600};
  color: ${({ theme, color }) => color || theme.blue};

  @media (${({ theme }) => theme.xlDown}) {
    font-size: ${({ theme }) => theme.fs24};
  }
`;

const Text = styled.p`
  margin: 0;
  color: ${({ theme, color }) => color || theme.lightBlue};
  font-size: ${({ theme, fs }) => fs || theme.fs18};
  font-weight: ${({ fw }) => fw || 400};

  @media (${({ theme }) => theme.xlDown}) {
    font-size: ${({ theme }) => theme.fs18};
  }
`;

const White = styled.span`
  color: ${({ theme }) => theme.white};
`;

const Blue = styled.span`
  color: ${({ theme }) => theme.blue};
`;

const Purple = styled.span`
  color: ${({ theme }) => theme.purple};
`;

const LightBlue = styled.span`
  color: ${({ theme }) => theme.lightBlue};
`;

export { Title, SubTitle, Text, White, Blue, Purple, LightBlue };
