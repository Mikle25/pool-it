import React, { useMemo } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/logo.svg';
import { IconMedia } from '../styled/Icon';
import { Text } from '../styled/Text';
import useThemeContext from '../../hooks/useThemeContext';
import { useUserStateContext } from '../../store/userContext';
import BtnConnect from '../BtnConnect';

const ContainerFooter = styled.footer`
  display: flex;
  flex-direction: column;
  background: rgba(11, 147, 180, 0.86);
  padding: 2rem 14vw;

  @media (${({ theme }) => theme.xlDown}) {
    padding: 5vw;
    row-gap: 3vh;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 5vw;

  @media (${({ theme }) => theme.lgDown}) {
    height: auto;
    flex-direction: column;
    row-gap: 2rem;
  }
`;

const ContainerLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (${({ theme }) => theme.xlDown}) {
    row-gap: 5vh;
  }
`;

const MediaWrapper = styled.div`
  display: flex;
  column-gap: 2vw;
  margin-bottom: 20px;

  @media (${({ theme }) => theme.lgDown}) {
    column-gap: 10vw;
    margin: 0;
  }
`;

const ContainerLinks = styled.div`
  position: relative;
  top: 2rem;
  display: flex;
  gap: 3vw 5vw;

  @media (${({ theme }) => theme.lgDown}) {
    position: static;
    flex-wrap: wrap;
    column-gap: 7vw;
    width: auto;
  }
`;

const FooterUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  row-gap: 2vw;

  @media (${({ theme }) => theme.xlDown}) {
    row-gap: 3vh;
  }

  a {
    color: ${({ theme }) => theme.white};
  }
`;

const FooterCopyright = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 12px;
`;

const socials = [
  {
    title: 'Linkedin',
    icon: <IconMedia icon={['fab', 'linkedin-in']} size="1x" />,
    href: 'https://www.linkedin.com/',
  },
  {
    title: 'Facebook',
    icon: <IconMedia icon={['fab', 'facebook-f']} size="1x" />,
    href: 'https://www.facebook.com/',
  },
  {
    title: 'Twitter',
    icon: <IconMedia icon={['fab', 'twitter']} size="1x" />,
    href: 'https://twitter.com/',
  },
];

const companyLinks = [
  {
    title: 'About us',
    href: '/',
  },
  {
    title: 'Contacts us',
    href: '/',
  },
  {
    title: 'Pricing',
    href: '/',
  },
];

const supportLinks = [
  {
    title: 'Legal',
    href: '/',
  },
  {
    title: 'Help center',
    href: '/',
  },
  {
    title: 'Terms of service',
    href: '/',
  },
];

const AppFooter = () => {
  const theme = useThemeContext();
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const { isLoggedIn } = useUserStateContext();

  return (
    <ContainerFooter>
      <Container>
        <ContainerLogo>
          <NavLink to="/">
            <img src={logo} alt="Pool It" />
          </NavLink>
        </ContainerLogo>

        <ContainerLinks>
          <FooterUl>
            <Text fw="700" color={theme.white}>
              Company
            </Text>

            {companyLinks.map((company) => (
              <li key={company.title}>
                <a href={company.href} target="_blank" rel="noreferrer">
                  {company.title}
                </a>
              </li>
            ))}
          </FooterUl>

          <FooterUl>
            <Text fw="700" color={theme.white}>
              Support
            </Text>

            {supportLinks.map((support) => (
              <li key={support.title}>
                <a href={support.href} target="_blank" rel="noreferrer">
                  {support.title}
                </a>
              </li>
            ))}
          </FooterUl>
        </ContainerLinks>

        <div>{!isLoggedIn && <BtnConnect />}</div>
      </Container>

      <MediaWrapper>
        {socials.map((social) => (
          <a
            key={social.title}
            href={social.href}
            target="_blank"
            rel="noreferrer"
          >
            {social.icon}
          </a>
        ))}
      </MediaWrapper>

      <FooterCopyright>{`Copyright © ${currentYear} All rights reserved`}</FooterCopyright>
    </ContainerFooter>
  );
};

export default AppFooter;
