import React, { FC } from 'react';
import { useColorMode, theme } from '@chakra-ui/core';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';

interface StripeCardProps {
  onChange: (event: StripeCardElementChangeEvent) => void;
}

export const StripeCard: FC<StripeCardProps> = ({ onChange }) => {
  const { colorMode } = useColorMode();

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color:
          colorMode === 'dark'
            ? theme.colors.gray[200]
            : theme.colors.gray[700],
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <CardElement
      id="card-element"
      options={CARD_ELEMENT_OPTIONS}
      onChange={onChange}
    />
  );
};
