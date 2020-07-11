import React from 'react';
import {
  ColorModeProvider,
  ThemeProvider,
  theme,
  CSSReset,
} from '@chakra-ui/core';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { AppContextProvider } from './providers/AppContextProvider';
import { App } from './components/App';

render(
  <ColorModeProvider value="dark">
    <ThemeProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </ColorModeProvider>,
  document.getElementById('root'),
);
