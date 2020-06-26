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

import { useCreateLinkMutation } from '../../../graphql';

export const Create = () => {
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
    initialValues: { url: '' },
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
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <FormControl as="fieldset" isInvalid={touched.url && !!errors.url}>
        <FormLabel htmlFor="url">URL</FormLabel>
        <Input
          isFullWidth
          type="text"
          id="url"
          aria-describedby="url-helper-text"
          placeholder="https://google.com/"
          value={values.url}
          isDisabled={createLinkPayload.fetching}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <FormHelperText id="email-helper-text">
          Where should we direct this new link to?
        </FormHelperText>
        <FormErrorMessage>{errors.url}</FormErrorMessage>
      </FormControl>
      <fieldset>
        <Button isLoading={createLinkPayload.fetching} type="submit">
          Create
        </Button>
      </fieldset>
    </form>
  );
};
