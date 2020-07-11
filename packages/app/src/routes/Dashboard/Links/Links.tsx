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
  Text,
  Icon,
  Tooltip,
  Button,
} from '@chakra-ui/core';

import {
  Link as GraphQLLink,
  Organization,
  User,
  Maybe,
  useLinksQuery,
  useDestroyLinkMutation,
} from '../../../graphql';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../../../components/Table';
import { getLinkOrg } from '../../../utils/getLinkOrg';

type LinksWithOrganizationUser = Array<
  Pick<GraphQLLink, 'id' | 'slug' | 'url' | 'createdAt'> & {
    organization?: Maybe<Pick<Organization, 'id' | 'name' | 'domain'>>;
    user: Pick<User, 'id' | 'name' | 'email'>;
  }
>;

export const Links = () => {
  const [links, setLinks] = useState<LinksWithOrganizationUser>([]);
  const [linksPayload] = useLinksQuery({ requestPolicy: 'cache-and-network' });
  const [destroyLinkPayload, getDestroyLinkPayload] = useDestroyLinkMutation();
  const [value, setValue] = useState('');
  const { onCopy, hasCopied } = useClipboard<string>(value);
  const toast = useToast();

  const handleCopy = (link: string) => {
    setValue(link);

    onCopy && onCopy();
  };

  const handleDestroyClick = async (id: string) => {
    await getDestroyLinkPayload({ id });

    const newOrganizations = links.filter(link => link.id !== id);

    setLinks(newOrganizations);
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

  useEffect(() => {
    if (linksPayload.data) {
      setLinks(linksPayload.data.links);
    }
  }, [linksPayload.data]);

  if (linksPayload.data) {
    return (
      <Table width="100%">
        <TableHead>
          <TableRow index={0}>
            <TableHeader>Edge URL</TableHeader>
            <TableHeader>Org</TableHeader>
            <TableHeader>URL</TableHeader>
            <TableHeader>Destroy</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {linksPayload.data.links.map((link, index) => (
            <TableRow
              key={link.id}
              index={index}
              backgroundColor={index % 2 ? 'gray.700' : 'gray.600'}
            >
              <TableCell>
                <Link
                  href={getLinkOrg(link)}
                  target="_blank"
                  rel="noopener"
                  color="orange.500"
                >
                  {getLinkOrg(link)}
                </Link>{' '}
                <Tooltip label="Copy" aria-label="Copy">
                  <Link onClick={() => handleCopy(getLinkOrg(link))}>
                    <Icon name="copy" />
                  </Link>
                </Tooltip>
              </TableCell>
              <TableCell>
                {link.organization ? link.organization.name : 'None'}
              </TableCell>
              <TableCell maxWidth={120} overflowWrap="break-word">
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener"
                  color="orange.500"
                >
                  <Text fontSize="md" isTruncated>
                    {link.url}
                  </Text>
                </Link>
              </TableCell>
              <TableCell width="50px">
                <Button
                  variantColor="red"
                  isLoading={destroyLinkPayload.fetching}
                  onClick={async () => await handleDestroyClick(link.id)}
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
