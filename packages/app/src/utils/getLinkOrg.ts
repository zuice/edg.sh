import { Link, Organization } from '../graphql';

type LinkWithRelations = Pick<Link, 'id' | 'slug' | 'url' | 'createdAt'> & {
  organization?:
    | Pick<Organization, 'id' | 'name' | 'domain'>
    | null
    | undefined;
};
export const getLinkOrg = (link: LinkWithRelations) => {
  if (link.organization) {
    return `https://${link.organization.domain}/${link.slug}`;
  }

  return `https://edg.sh/${link.slug}`;
};
