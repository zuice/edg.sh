export const generateSlug = (): string => {
  const slug = Math.random().toString(36).substr(2, 9);

  return slug;
};
