export const toSlug = (title: string) => {
  return title.replace(/[?]/g, "").replace(/\s+/g, "-").toLowerCase();
};
