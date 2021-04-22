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

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Normalize />
        <GlobalStyles />
        <AppWrapper>
          <AppHeader />
          <Routes />
          <AppFooter />
        </AppWrapper>
      </ThemeProvider>
    </Router>
  );
}

export default App;
