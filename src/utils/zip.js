import fs from "fs"
import path from "path"
import { pipeline, Transform } from "stream";
import { brotliCompress } from "zlib"
import { checkIsPathExists } from "./checkIsPathExists.js";
import { createFile } from "./createFile.js";

export const zip = async (pathToFile, destination) => {
  const isDirectoryExists = await checkIsPathExists(destination);
  const isFileExists = await checkIsPathExists(pathToFile);

  if(!isDirectoryExists){
    console.log("\x1b[31m", new Error('Dir does not exists'));
    return false;
  }
  if(!isFileExists){
    console.log("\x1b[31m", new Error('File does not exist'));
    return false;
  }

  createFile(`${path.basename(pathToFile)}.br`, destination);

  const transform = new Transform({
    transform(chunk, _, callback) {
        brotliCompress(chunk, (err, buffer) => callback(null, buffer));
    },
  });
  console.log(destination + path.sep + `${path.basename(pathToFile)}.br`);

  const readStream = fs.createReadStream(pathToFile);
  const writeStream = fs.createWriteStream(destination + path.sep + `${path.basename(pathToFile)}.br`);

  pipeline(
      readStream,
      transform,
      writeStream,
      () => {}
  );
}