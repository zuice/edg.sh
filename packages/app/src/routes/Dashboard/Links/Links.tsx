import React from 'react';
import {
  Link,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Stack,
  Skeleton,
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

  if (linksPayload.data) {
    return (
      <Table width="100%">
        <TableHead>
          <TableRow>
            <TableHeader>URL</TableHeader>
            <TableHeader>Slug</TableHeader>
            <TableHeader>Edge URL</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {linksPayload.data.links.map((link, index) => (
            <TableRow
              key={link.id}
              backgroundColor={index % 2 ? 'gray.700' : 'gray.600'}
            >
              <TableCell>{link.url}</TableCell>
              <TableCell>{link.slug}</TableCell>
              <TableCell>
                <Link color="orange.500" href={`https://edg.sh/${link.slug}`}>
                  https://edg.sh/{link.slug}
                </Link>
              </TableCell>
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
      <Skeleton height="40px" my="10px" />
      <Skeleton height="40px" my="10px" />
      <Skeleton height="40px" my="10px" />
      <Skeleton height="40px" my="10px" />
      <Skeleton height="40px" my="10px" />
      <Skeleton height="40px" my="10px" />
      <Skeleton height="40px" my="10px" />
      <Skeleton height="40px" my="10px" />
      <Skeleton height="40px" my="10px" />
    </Stack>
  );
};
