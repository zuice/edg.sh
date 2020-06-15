import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Button,
} from '@chakra-ui/core';

import { useRegisterMutation } from '../../graphql';

export const Register = () => {
  const [authPayload, getAuthPayload] = useRegisterMutation();
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

      if (values.name.length < 4) {
        errors.name = 'Name too short!';
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
      getAuthPayload({ ...values });
    },
  });

  useEffect(() => {
    if (authPayload.error) {
      setErrors({ email: 'Account already exists with email given.' });
    }

    if (authPayload.data) {
      alert(authPayload.data.register.token);
    }
  }, [authPayload, setErrors]);

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <FormControl as="fieldset" isInvalid={touched.name && !!errors.name}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          type="text"
          id="name"
          aria-describedby="name-helper-text"
          placeholder="John Smith"
          value={values.name}
          isDisabled={authPayload.fetching}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <FormHelperText id="name-helper-text">
          We'll never share your email.
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
