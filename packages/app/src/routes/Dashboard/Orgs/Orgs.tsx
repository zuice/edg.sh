import React, { useState, useEffect } from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Stack,
  Skeleton,
  Button,
  Icon,
} from '@chakra-ui/core';

import {
  useOrganizationsQuery,
  useDestroyOrganizationMutation,
  Organization,
  User,
} from '../../../graphql';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../../../components/Table';

type OrganizationsWithOwner = Array<
  Pick<Organization, 'id' | 'name' | 'domain' | 'createdAt'> & {
    owner: Pick<User, 'id' | 'name' | 'email'>;
  }
>;

export const Orgs = () => {
  const [organizations, setOrganizations] = useState<OrganizationsWithOwner>(
    [],
  );
  const [organizationsPayload] = useOrganizationsQuery({
    requestPolicy: 'cache-and-network',
  });
  const [
    destroyOrganizationPayload,
    getDestroyOrganizationPayload,
  ] = useDestroyOrganizationMutation();

  const handleDestroyClick = async (id: string) => {
    await getDestroyOrganizationPayload({ id });

    const newOrganizations = organizations.filter(
      organization => organization.id !== id,
    );

    setOrganizations(newOrganizations);
  };

  useEffect(() => {
    if (organizationsPayload.data) {
      setOrganizations(organizationsPayload.data.organizations);
    }
  }, [organizationsPayload.data]);

  if (organizationsPayload.data) {
    return (
      <Table width="100%">
        <TableHead>
          <TableRow index={0}>
            <TableHeader>Name</TableHeader>
            <TableHeader>Domain</TableHeader>
            <TableHeader>Owner</TableHeader>
            <TableHeader>Destroy</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {organizations.map((organization, index) => (
            <TableRow key={organization.id} index={index}>
              <TableCell>{organization.name}</TableCell>
              <TableCell>{organization.domain}</TableCell>
              <TableCell>{organization.owner.name}</TableCell>
              <TableCell width="50px">
                <Button
                  variantColor="red"
                  isLoading={destroyOrganizationPayload.fetching}
                  onClick={async () =>
                    await handleDestroyClick(organization.id)
                  }
                >
                  <Icon name="delete" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
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
          Your token may have expired. Please refresh.
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
