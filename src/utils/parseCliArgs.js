export const parseCliArgs = (args) => {
  const parsed = args.slice(2).map(el => el.split('='));
  return Object.fromEntries(parsed);
};