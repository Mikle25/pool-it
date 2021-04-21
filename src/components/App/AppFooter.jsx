import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/logo.svg';
import { Btn } from '../styled/Btn';
import { IconMedia } from '../styled/Icon';
import { Text } from '../styled/Text';
import useThemeContext from '../../hooks/useThemeContext';

const Container = styled.footer`
  display: flex;
  justify-content: space-between;
  height: 280px;
  background: rgba(11, 147, 180, 0.86);
  padding: 45px 217px;
  column-gap: 5vw;

  @media (${({ theme }) => theme.xlDown}) {
    height: auto;
    flex-direction: column;
    padding: 50px 25px;
    row-gap: 5vh;
  }
`;

const ContainerMedia = styled.div`
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

  @media (${({ theme }) => theme.xlDown}) {
    column-gap: 10vw;
  }
`;

const ContainerLinks = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: calc(100% / 3);
  grid-gap: 3vw 5vw;

  @media (${({ theme }) => theme.xlDown}) {
    row-gap: 5vw;
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
`;

const AppFooter = () => {
  const theme = useThemeContext();

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

  return (
    <Container>
      <ContainerMedia>
        <NavLink to="/">
          <img src={logo} alt="Pool It" />
        </NavLink>

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
      </ContainerMedia>

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

      <div>
        <Btn variant="primary">Connect wallet</Btn>
      </div>
    </Container>
  );
};

export default AppFooter;
