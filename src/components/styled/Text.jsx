import styled from 'styled-components';

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fs60};
  font-weight: ${({ fw }) => fw || 700};
  color: ${({ theme }) => theme.lightBlue};

  @media (${({ theme }) => theme.mdDown}) {
    font-size: ${({ theme }) => theme.fs36};
  }
`;

const SubTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme, fs }) => fs || theme.fs36};
  font-weight: ${({ fw }) => fw || 600};
  color: ${({ theme }) => theme.darkBlue};

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

const WhiteText = styled.span`
  color: ${({ theme }) => theme.white};
`;

export { Title, SubTitle, Text, WhiteText };
