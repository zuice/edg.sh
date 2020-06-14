import React from 'react';

import { Link } from '../components/Link';

export const Landing = () => (
  <>
    <p>Welcome to the app.</p>
    <p>
      Please <Link to="/auth/login">Login</Link> or{' '}
      <Link to="/auth/register">Register</Link> to continue.
    </p>
  </>
);
