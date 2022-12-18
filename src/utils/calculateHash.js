import { createHash } from "crypto";
import fs from "fs/promises";

export const calculateHash = async (filePath) => {
  const fileContent = await fs.readFile(filePath);
  const hash = createHash('sha256');
  hash.setEncoding('hex');
  hash.write(fileContent);
  hash.end()
  return hash.read()
}