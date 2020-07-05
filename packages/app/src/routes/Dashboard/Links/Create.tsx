import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import {
  useToast,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Button,
  Select,
} from '@chakra-ui/core';

import {
  useCreateLinkMutation,
  useOrganizationsDropdownQuery,
} from '../../../graphql';

export const Create = () => {
  const [organizationsPayload] = useOrganizationsDropdownQuery();
  const [createLinkPayload, getCreateLinkPayload] = useCreateLinkMutation();
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
    initialValues: { url: '', org: '' },
    validate: values => {
      const errors: { url?: string } = {};

      if (
        !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/.test(
          values.url,
        )
      ) {
        errors.url = 'Please enter a valid URL e.g. "https://google.com/".';
      }

      return errors;
    },
    onSubmit: values => {
      getCreateLinkPayload(values);
    },
  });

  useEffect(() => {
    if (createLinkPayload.error) {
      setErrors({ url: 'Could not add URL, please check it.' });
    }

    if (createLinkPayload.data) {
      toast({
        title: 'Created',
        description: `Your link: "https://edg.sh/${createLinkPayload.data.createLink.slug}" has been created.`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      history.push('/links');
    }
  }, [createLinkPayload, setErrors, toast, history]);

  return (
    <>
      <Helmet>
        <title>Create Link - Edg.sh</title>
      </Helmet>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <FormControl as="fieldset" isInvalid={touched.url && !!errors.url}>
          <FormLabel htmlFor="url">URL</FormLabel>
          <Input
            isFullWidth
            type="text"
            id="url"
            name="url"
            value={values.url}
            aria-describedby="url-helper-text"
            placeholder="https://google.com/"
            isDisabled={createLinkPayload.fetching}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <FormHelperText id="email-helper-text">
            Where should we direct this new link to?
          </FormHelperText>
          <FormErrorMessage>{errors.url}</FormErrorMessage>
        </FormControl>
        <FormControl as="fieldset" isInvalid={touched.org && !!errors.org}>
          <FormLabel htmlFor="url">Org</FormLabel>
          <Select
            id="org"
            name="org"
            value={values.org}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">None</option>
            {organizationsPayload.data &&
              organizationsPayload.data.organizations.map(organization => (
                <option key={organization.id} value={organization.id}>
                  {organization.name}
                </option>
              ))}
          </Select>
          <FormHelperText id="email-helper-text">
            Which org should we attach this link to? (Optional)
          </FormHelperText>
          <FormErrorMessage>{errors.url}</FormErrorMessage>
        </FormControl>
        {values.org !== '' ? (
          <p>Soon you will be prompted for custom Slug.</p>
        ) : null}
        <fieldset>
          <Button isLoading={createLinkPayload.fetching} type="submit">
            Create
          </Button>
        </fieldset>
      </form>
    </>
  );
};
