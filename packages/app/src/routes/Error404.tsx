import React from 'react';
import { Helmet } from 'react-helmet';
import { Heading } from '@chakra-ui/core';

export const Error404 = () => (
  <>
    <Helmet>404 - Edg.sh</Helmet>
    <Heading>404</Heading>
    <p>page not found</p>
  </>
);
