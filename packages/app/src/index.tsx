import React from 'react';
import {
  ColorModeProvider,
  ThemeProvider,
  theme,
  CSSReset,
} from '@chakra-ui/core';
import { render } from 'react-dom';

import { App } from './components/App';

render(
  <ColorModeProvider>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <App />
    </ThemeProvider>
  </ColorModeProvider>,
  document.getElementById('root'),
);
