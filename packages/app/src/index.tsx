import React from 'react';
import {
  ColorModeProvider,
  ThemeProvider,
  theme,
  CSSReset,
} from '@chakra-ui/core';
import { render } from 'react-dom';

import { AuthContextProvider } from './providers/AuthContextProvider';
import { App } from './components/App';

render(
  <ColorModeProvider>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeProvider>
  </ColorModeProvider>,
  document.getElementById('root'),
);
