import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import { Redirect } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Button,
} from '@chakra-ui/core';

import { AuthContext } from '../../context/AuthContext';
import { Link } from '../../components/Link';

export const Login = () => {
  const { loginPayload, handleLogin } = useContext(AuthContext);
  const {
    setErrors,
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: { email: '', password: '' },
    validate: values => {
      const errors = {} as { email?: string; password?: string };

      if (!values.email) {
        errors.email = 'Required!';
      } else if (values.email.length < 6) {
        errors.email = 'Too short!';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid format!';
      }

      if (!values.password) {
        errors.password = 'Required!';
      } else if (values.password.length < 5) {
        errors.password = 'Too short!';
      }

      return errors;
    },
    onSubmit: values => {
      handleLogin(values);
    },
  });

  useEffect(() => {
    if (loginPayload.error) {
      setErrors({ email: 'User by given email does not exist.' });
    }
  }, [loginPayload.error, setErrors]);

  if (loginPayload.data) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off" style={{ width: '100%' }}>
      <FormControl as="fieldset" isInvalid={touched.email && !!errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          type="email"
          id="email"
          aria-describedby="email-helper-text"
          placeholder="john@example.org"
          value={values.email}
          isDisabled={loginPayload.fetching}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <FormHelperText id="email-helper-text">
          We'll never share your email.
        </FormHelperText>
        <FormErrorMessage>{errors.email}</FormErrorMessage>
      </FormControl>
      <FormControl
        as="fieldset"
        isInvalid={touched.password && !!errors.password}
      >
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          type="password"
          id="password"
          aria-describedby="password-helper-text"
          placeholder="superSecret!!231@"
          value={values.password}
          isDisabled={loginPayload.fetching}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <FormHelperText id="password-helper-text">
          Nobody sees your password, not even us.
        </FormHelperText>
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>
      <fieldset>
        <Button isLoading={loginPayload.fetching} type="submit">
          Login
        </Button>{' '}
        or <Link to="/auth/register">Register</Link>
      </fieldset>
    </form>
  );
};
