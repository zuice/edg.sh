import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
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

export const Register = () => {
  const { registerPayload, handleRegister } = useContext(AuthContext);
  const {
    setErrors,
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validate: values => {
      const errors = {} as { name?: string; email?: string; password?: string };
      const nameSplit = values.name.split(' ');

      if (!values.name) {
        errors.name = 'Required!';
      } else if (nameSplit.length <= 1) {
        errors.name = 'Please provide first and last name.';
      }

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
      handleRegister(values);
    },
  });

  useEffect(() => {
    if (registerPayload.error) {
      setErrors({ email: 'Account already exists for given email.' });
    }
  }, [registerPayload.error, setErrors]);

  return (
    <form autoComplete="off" onSubmit={handleSubmit} style={{ width: '100%' }}>
      <FormControl as="fieldset" isInvalid={touched.name && !!errors.name}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          type="text"
          id="name"
          aria-describedby="name-helper-text"
          placeholder="John Smith"
          value={values.name}
          isDisabled={registerPayload.fetching}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <FormHelperText id="email-helper-text">
          What should we refer to you as?
        </FormHelperText>
        <FormErrorMessage>{errors.name}</FormErrorMessage>
      </FormControl>
      <FormControl as="fieldset" isInvalid={touched.email && !!errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          type="email"
          id="email"
          aria-describedby="email-helper-text"
          placeholder="john@example.org"
          value={values.email}
          isDisabled={registerPayload.fetching}
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
          isDisabled={registerPayload.fetching}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <FormHelperText id="password-helper-text">
          Nobody sees your password, not even us.
        </FormHelperText>
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>
      <fieldset>
        <Button isLoading={registerPayload.fetching} type="submit">
          Register
        </Button>{' '}
        or <Link to="/auth/Login">Login</Link>
      </fieldset>
    </form>
  );
};
