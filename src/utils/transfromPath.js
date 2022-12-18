import path from "path";

export const transfromPath = (pathFromCli) => {
  const transformedPath = pathFromCli.split('/').join(path.sep);
  const newPath = path.isAbsolute(pathFromCli) ? transformedPath : process.env.homedir + path.sep + transformedPath;
  return newPath;
}