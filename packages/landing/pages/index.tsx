import React from 'react';
import { Code, Link as ChakraLink } from '@chakra-ui/core';
import Link from 'next/link';

const Landing = () => (
  <div>
    Welcome to <Code>edg.sh</Code>, to login to your dashboard, click{' '}
    <ChakraLink
      color="orange.500"
      href={
        process.env.NODE_ENV === 'production'
          ? 'https://app.edg.sh'
          : 'http://localhost:3000'
      }
    >
      here
    </ChakraLink>
    <hr />
    Proper landing page coming soon.
  </div>
);

export default Landing;
