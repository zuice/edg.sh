import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Button,
} from '@chakra-ui/core';

import { useLoginMutation } from '../../graphql';
import { AuthContext } from '../../context/AuthContext';

export const Login = () => {
  const [authPayload, getAuthPayload] = useLoginMutation();
  const { setAccessToken } = useContext(AuthContext);
  const { push } = useHistory();
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
      getAuthPayload({ ...values }, { requestPolicy: 'network-only' });
    },
  });

  useEffect(() => {
    if (authPayload.error) {
      setErrors({ email: 'Incorrect password for given email.' });
    }

    if (authPayload.data && !authPayload.fetching) {
      const { token } = authPayload.data.login;

      setAccessToken(token);
      push('/');
    }
  }, [authPayload, setErrors, setAccessToken, push]);

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <FormControl as="fieldset" isInvalid={touched.email && !!errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          type="email"
          id="email"
          aria-describedby="email-helper-text"
          placeholder="john@example.org"
          value={values.email}
          isDisabled={authPayload.fetching}
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
          isDisabled={authPayload.fetching}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <FormHelperText id="password-helper-text">
          Nobody sees your password, not even us.
        </FormHelperText>
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>
      <fieldset>
        <Button isLoading={authPayload.fetching} type="submit">
          Login
        </Button>
      </fieldset>
    </form>
  );
};
