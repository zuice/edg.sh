import React, { useContext } from 'react';
import { Button } from '@chakra-ui/core';

import { AuthContext } from '../context/AuthContext';
import { useLogoutMutation } from '../graphql';

export const Dashboard = () => {
  const { setAccessToken } = useContext(AuthContext);
  const [, getLogoutPayload] = useLogoutMutation();

  const handleLogout = () => {
    getLogoutPayload();
    setAccessToken();
  };

  return (
    <div>
      Welcome to the dashboard.
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};
