import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  useToast,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Button,
} from '@chakra-ui/core';

import { useCreateOrganizationMutation } from '../../../graphql';

export const Create = () => {
  const [
    createOrganizationPayload,
    getCreateOrganizationPayload,
  ] = useCreateOrganizationMutation();

  const toast = useToast();
  const history = useHistory();
  const {
    setErrors,
    handleSubmit,
    touched,
    errors,
    values,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues: { name: '', domain: '' },
    validate: values => {
      const errors: { name?: string; domain?: string } = {};

      if (values.name.length < 4 || values.name.length > 24) {
        errors.name =
          'Name must be greater than 4 characters but less than 24.';
      }

      if (
        !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/.test(
          values.domain,
        )
      ) {
        errors.domain = 'Please enter a valid URL e.g. "https://google.com/".';
      }

      if (values.domain.indexOf('edg.sh') >= 0) {
        errors.name = "You can't use our domain.";
      }

      return errors;
    },
    onSubmit: values => {
      getCreateOrganizationPayload(values);
    },
  });

  useEffect(() => {
    if (createOrganizationPayload.error) {
      setErrors({ domain: 'Could not add URL, please check it.' });
    }

    if (createOrganizationPayload.data) {
      toast({
        title: 'Created',
        description: `Your org: "${createOrganizationPayload.data.createOrganization.name}" has been created.`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      history.push('/orgs');
    }
  }, [createOrganizationPayload, setErrors, toast, history]);

  return (
    <form onSubmit={handleSubmit} autoComplete="off" style={{ width: '100%' }}>
      <FormControl as="fieldset" isInvalid={touched.name && !!errors.name}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          isFullWidth
          type="text"
          id="name"
          name="name"
          value={values.name}
          aria-describedby="url-helper-text"
          placeholder="My Org"
          isDisabled={createOrganizationPayload.fetching}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <FormHelperText id="email-helper-text">
          What should your new Organization be called?
        </FormHelperText>
        <FormErrorMessage>{errors.name}</FormErrorMessage>
      </FormControl>
      <FormControl as="fieldset" isInvalid={touched.domain && !!errors.domain}>
        <FormLabel htmlFor="url">Domain</FormLabel>
        <Input
          isFullWidth
          type="text"
          id="domain"
          name="domain"
          value={values.domain}
          aria-describedby="url-helper-text"
          placeholder="https://google.com/"
          isDisabled={createOrganizationPayload.fetching}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <FormHelperText id="email-helper-text">
          What domain would you like to redirect?
        </FormHelperText>
        <FormErrorMessage>{errors.domain}</FormErrorMessage>
      </FormControl>
      <fieldset>
        <Button isLoading={createOrganizationPayload.fetching} type="submit">
          Create
        </Button>
      </fieldset>
    </form>
  );
};
