import React from 'react';
import { Normalize } from 'styled-normalize';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from '../../utils/theme';
import GlobalStyles from '../styled/GlobalStyles';
import '../../assets/scss/index.scss';
import Routes from '../../router/Routes';
import AppWrapper from './AppWrapper';
import '../../plugins/faLibrary';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import { UserProvider } from '../../store/userContext';
import Toast from '../styled/Toast';
import ScrollToTop from '../../hooks/useScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ThemeProvider theme={theme}>
        <Normalize />
        <GlobalStyles />

        <UserProvider>
          <AppWrapper>
            <AppHeader />
            <Routes />
            <AppFooter />
          </AppWrapper>
        </UserProvider>

        <Toast
          position="top-right"
          autoClose={4000}
          hideProgressBar
          closeOnClick
          pauseOnHover={false}
          draggable={false}
        />
      </ThemeProvider>
    </Router>
  );
}

export default App;
