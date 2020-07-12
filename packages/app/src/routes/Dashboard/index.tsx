import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import { AppContext } from '../../context/AppContext';
import { Navbar } from '../../components/Navbar';
import { Container } from '../../components/Container';
import { Links } from './Links';
import { Orgs } from './Orgs';
import { Upgrade } from './Upgrade';
import { Error404 } from '../Error404';
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  CloseButton,
  useDisclosure,
} from '@chakra-ui/core';

export const Dashboard = () => {
  const { me } = useContext(AppContext);
  const { isOpen, onToggle } = useDisclosure(true);

  return (
    <>
      <Helmet>
        <title>Dashboard - Edg.sh</title>
      </Helmet>
      <Navbar />
      <Container>
        {!me?.stripeId && isOpen ? (
          <Alert
            width="100%"
            marginBottom={3}
            borderRadius={5}
            status="warning"
          >
            <AlertIcon />
            <AlertTitle mr={2}>Warning!</AlertTitle>
            <AlertDescription>
              You do not have a payment method attached.
            </AlertDescription>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={onToggle}
            />
          </Alert>
        ) : null}
        <Switch>
          <Route
            exact
            path="/"
            component={() => <span>Welcome to your dashboard, {me?.name}</span>}
          />
          <Route path="/links" component={Links} />
          <Route path="/orgs" component={Orgs} />
          <Route exact path="/upgrade" component={Upgrade} />
          <Route path="*" component={Error404} />
        </Switch>
      </Container>
    </>
  );
};
