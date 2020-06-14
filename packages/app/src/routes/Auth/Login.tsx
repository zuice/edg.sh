import React from 'react';
import { useFormik } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Button,
} from '@chakra-ui/core';

export const Login = () => {
  const {
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

      console.log(errors);

      return errors;
    },
    onSubmit: values => {
      alert(JSON.stringify(values));
    },
  });

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
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <FormHelperText id="password-helper-text">
          Nobody sees your password, not even us.
        </FormHelperText>
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>
      <fieldset>
        <Button type="submit">Login</Button>
      </fieldset>
    </form>
  );
};
