import React, { useContext } from 'react';
import { Skeleton } from '@chakra-ui/core';
import { Switch, Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { Auth } from '../routes/Auth';
import { Dashboard } from '../routes/Dashboard';

export const Router = () => {
  const { isLoading, isLoggedIn } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div>
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <Switch>
        <Route path="/" component={Dashboard} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Redirect from="*" to="/auth/login" />
    </Switch>
  );
};
