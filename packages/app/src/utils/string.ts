export const toKebabCase = (str: string) =>
  str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // replace spaces and non-alphanum with -
    .replace(/^-+|-+$/g, ''); // remove leading/trailing -

export const toCapitalize = (str: string) => {
  return `${str.at(0)?.toUpperCase()}${str.substring(1).toLowerCase()}`;
};
