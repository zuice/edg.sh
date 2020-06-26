import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { Loading } from './Loading';
import { Auth } from '../routes/Auth';
import { Dashboard } from '../routes/Dashboard';

export const Router = () => {
  const { isLoading, isLoggedIn } = useContext(AuthContext);

  if (isLoading) {
    return <Loading />;
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
