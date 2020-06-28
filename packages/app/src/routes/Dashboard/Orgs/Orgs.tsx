import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Stack,
  Skeleton,
} from '@chakra-ui/core';

import { useOrganizationsQuery } from '../../../graphql';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../../../components/Table';

export const Orgs = () => {
  const [organizationsPayload] = useOrganizationsQuery();

  if (organizationsPayload.data) {
    return (
      <Table width="100%">
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Domain</TableHeader>
            <TableHeader>Owner</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {organizationsPayload.data.organizations.map(
            (organization, index) => (
              <TableRow
                key={organization.id}
                backgroundColor={index % 2 ? 'gray.700' : 'gray.600'}
              >
                <TableCell>{organization.name}</TableCell>
                <TableCell>{organization.domain}</TableCell>
                <TableCell>{organization.owner.name}</TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    );
  }

  if (organizationsPayload.error) {
    return (
      <Alert width="100%" marginTop={3} borderRadius={5} status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Error!</AlertTitle>
        <AlertDescription>
          We had an issue grabbing your organizations.
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
