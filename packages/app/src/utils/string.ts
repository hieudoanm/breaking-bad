export const toKebabCase = (str: string) =>
  str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // replace spaces and non-alphanum with -
    .replace(/^-+|-+$/g, ''); // remove leading/trailing -
