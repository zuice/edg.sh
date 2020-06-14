import React from 'react';
import NextAppProps from 'next/types';
import {
  ColorModeProvider,
  ThemeProvider,
  theme,
  CSSReset,
} from '@chakra-ui/core';
import { AppPropsType } from 'next/dist/next-server/lib/utils';

const MyApp = ({ Component, pageProps }: AppPropsType) => (
  <ColorModeProvider value="dark">
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  </ColorModeProvider>
);

export default MyApp;
