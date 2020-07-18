import React, { FC, useContext, useState, useEffect } from 'react';
import {
  useColorMode,
  useDisclosure,
  Flex,
  Box,
  Heading,
  theme,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/core';
import { StripeCardElementChangeEvent, Token } from '@stripe/stripe-js';
import { useStripe, CardElement, useElements } from '@stripe/react-stripe-js';

import {
  useCreateSubscriptionMutation,
  Product as ProductType,
  Price,
} from '../../graphql';
import { AppContext } from '../../context/AppContext';
import { StripeCard } from '../StripeCard';

interface ProductProps {
  product: Pick<
    ProductType,
    'id' | 'name' | 'description' | 'active' | 'livemode'
  > & {
    prices: Array<Pick<Price, 'id' | 'unitAmount'>>;
  };
  current?: boolean;
  disabled?: boolean;
  comingSoon?: boolean;
}

export const Product: FC<ProductProps> = ({
  product,
  current,
  disabled,
  comingSoon,
}) => {
  const [
    createSubscriptionPayload,
    getCreateSubscriptionPayload,
  ] = useCreateSubscriptionMutation();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { me } = useContext(AppContext);
  const [error, setError] = useState<string>();
  const [subscribed, setSubscribed] = useState(current);
  const stripe = useStripe();
  const elements = useElements();

  const priceRaw = product.prices[0].unitAmount;
  const price = !!priceRaw
    ? priceRaw === 0
      ? 'Free'
      : `$${priceRaw / 100} monthly`
    : 'Free';

  const handleBackgroundColor = () => {
    if (subscribed) {
      if (colorMode === 'dark') {
        return theme.colors.green[900];
      } else {
        return theme.colors.green[100];
      }
    } else if (disabled) {
      if (colorMode === 'dark') {
        return theme.colors.gray[900];
      } else {
        return theme.colors.gray[100];
      }
    }

    return undefined;
  };
  const handleBorderColor = () => {
    if (subscribed) {
      if (colorMode === 'dark') {
        return theme.colors.green[600];
      } else {
        return theme.colors.green[700];
      }
    } else if (disabled) {
      if (colorMode === 'dark') {
        return theme.colors.gray[900];
      } else {
        return theme.colors.gray[300];
      }
    }

    if (colorMode === 'dark') {
      return theme.colors.gray[700];
    } else {
      return theme.colors.gray[200];
    }
  };

  const handleSubscribe = (token?: Token) => {
    const priceId = product.prices[0].id;

    getCreateSubscriptionPayload({ token: token?.id, priceId });
  };

  const handleChange = (event: StripeCardElementChangeEvent) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(undefined);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const card = elements?.getElement(CardElement);
    const result = await stripe?.createToken(card!);
    if (result?.error) {
      setError(result.error.message);
    } else {
      setError(undefined);
      handleSubscribe(result?.token);
    }
  };

  useEffect(() => {
    if (createSubscriptionPayload.data) {
      setSubscribed(true);
    }
  }, [createSubscriptionPayload, setSubscribed]);

  return (
    <>
      <Flex
        width="100%"
        padding={5}
        backgroundColor={handleBackgroundColor()}
        border={`1px solid ${handleBorderColor()}`}
        borderRadius={5}
        direction="column"
      >
        <Heading size="lg">{product.name}</Heading>
        <Box
          as="p"
          marginTop={3}
          color={
            colorMode === 'dark'
              ? theme.colors.gray[400]
              : theme.colors.gray[500]
          }
        >
          {product.description}
        </Box>
        <Box marginTop={3} marginBottom={3} color={theme.colors.green[500]}>
          {price}
        </Box>
        <hr />
        <Box marginTop={3}>
          <Button
            variantColor="green"
            leftIcon={subscribed || disabled ? 'unlock' : 'lock'}
            isDisabled={subscribed || disabled}
            onClick={subscribed || disabled ? undefined : onOpen}
          >
            {comingSoon
              ? 'Coming Soon'
              : subscribed || disabled
              ? 'Subscribed'
              : 'Subscribe'}
          </Button>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent borderRadius="0.25rem">
          <ModalCloseButton onClick={onClose} />
          {me?.stripeId ? (
            <>
              <ModalHeader>Subscription Confirmation</ModalHeader>
              <ModalBody>
                {createSubscriptionPayload.error ? (
                  <Alert
                    width="100%"
                    marginBottom={3}
                    borderRadius={5}
                    status="error"
                  >
                    <AlertIcon />
                    <AlertTitle mr={2}>Error!</AlertTitle>
                    <AlertDescription>
                      We hit an error on our end. Please refresh and try again.
                    </AlertDescription>
                  </Alert>
                ) : null}
                Are you sure you would like to subscribe to {product.name}?
              </ModalBody>
              <ModalFooter>
                <Button type="button" leftIcon="not-allowed" onClick={onClose}>
                  Close
                </Button>
                <Button
                  type="button"
                  variantColor="green"
                  leftIcon="unlock"
                  marginLeft="10px"
                  onClick={() => handleSubscribe()}
                  isLoading={createSubscriptionPayload.fetching}
                  isDisabled={!!createSubscriptionPayload.data}
                >
                  {!!createSubscriptionPayload.data
                    ? 'Subscribed'
                    : 'Subscribe'}
                </Button>
              </ModalFooter>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <ModalHeader>Subscription Confirmation</ModalHeader>
                <ModalBody>
                  <StripeCard onChange={handleChange} />
                  <div className="card-errors" role="alert">
                    {error}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="button"
                    leftIcon="not-allowed"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    variantColor="green"
                    leftIcon="unlock"
                    marginLeft="10px"
                    isLoading={createSubscriptionPayload.fetching}
                    isDisabled={subscribed}
                  >
                    {subscribed ? 'Subscribed' : 'Subscribe'}
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
