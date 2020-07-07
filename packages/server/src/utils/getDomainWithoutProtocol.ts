export const getDomainWithoutProtocol = (
  domainWithProtocol: string,
): string => {
  const domain = domainWithProtocol
    .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
    .split('/')[0];

  return domain;
};
