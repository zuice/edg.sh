import React, { useState, useEffect } from 'react';
import {
  useClipboard,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Stack,
  Skeleton,
  Link,
  Icon,
  Tooltip,
} from '@chakra-ui/core';

import { useLinksQuery } from '../../../graphql';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../../../components/Table';

export const Links = () => {
  const [linksPayload] = useLinksQuery();
  const [value, setValue] = useState('');
  const { onCopy, hasCopied } = useClipboard<string>(value);
  const toast = useToast();

  const handleCopy = (slug: string) => {
    const url = `https://edg.sh/${slug}`;

    setValue(url);
    onCopy && onCopy();
  };

  useEffect(() => {
    if (hasCopied) {
      toast({
        title: 'Copied',
        description: `Your link: "${value}" has been copied to the clipboard.`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [hasCopied, toast, value]);

  if (linksPayload.data) {
    return (
      <Table width="100%">
        <TableHead>
          <TableRow>
            <TableHeader>Edge URL</TableHeader>
            <TableHeader>Slug</TableHeader>
            <TableHeader>URL</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {linksPayload.data.links.map((link, index) => (
            <TableRow
              key={link.id}
              backgroundColor={index % 2 ? 'gray.700' : 'gray.600'}
            >
              <TableCell>
                <Link
                  href={`https://edg.sh/${link.slug}`}
                  target="_blank"
                  rel="noopener"
                  color="orange.500"
                >
                  https://edg.sh/{link.slug}
                </Link>{' '}
                <Tooltip label="Copy" aria-label="Copy">
                  <Link onClick={() => handleCopy(link.slug)}>
                    <Icon name="copy" />
                  </Link>
                </Tooltip>
              </TableCell>
              <TableCell>{link.slug}</TableCell>
              <TableCell overflowWrap="break-word">{link.url}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (linksPayload.error) {
    return (
      <Alert width="100%" marginTop={3} borderRadius={5} status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Error!</AlertTitle>
        <AlertDescription>
          We had an issue grabbing your links.
        </AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );
  }

  return (
    <Stack width="100%">
      <Skeleton height="40px" my="2px" />
      <Skeleton height="40px" my="2px" />
      <Skeleton height="40px" my="2px" />
      <Skeleton height="40px" my="2px" />
      <Skeleton height="40px" my="2px" />
      <Skeleton height="40px" my="2px" />
      <Skeleton height="40px" my="2px" />
      <Skeleton height="40px" my="2px" />
      <Skeleton height="40px" my="2px" />
    </Stack>
  );
};
