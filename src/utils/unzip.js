import fs from "fs"
import path from "path"
import { pipeline, Transform } from "stream";
import { brotliDecompress } from "zlib"
import { checkIsPathExists } from "./checkIsPathExists.js";
import { createFile } from "./createFile.js";

export const unzip = async (pathToFile, destination) => {
  const isDirectoryExists = await checkIsPathExists(destination);

  const fileExt = path.extname(pathToFile);
  const isFileExists = await checkIsPathExists(pathToFile);

  if(!isDirectoryExists){
    console.log("\x1b[31m", new Error('Dir does not exists'));
    return false;
  }
  if(!isFileExists){
    console.log("\x1b[31m", new Error('File does not exist'));
    return false;
  }
  if(fileExt !== '.br'){
    console.log("\x1b[31m", new Error('Its not an archive'));
    return false;
  }

  const unarchivedFileName = path.basename(pathToFile).substring(0, path.basename(pathToFile).lastIndexOf("."))
  createFile(unarchivedFileName, destination);

  const transform = new Transform({
    transform(chunk, _, callback) {
        brotliDecompress(chunk, (err, buffer) => callback(null, buffer.toString('utf-8')));
    },
  });

  const readStream = fs.createReadStream(pathToFile);
  const writeStream = fs.createWriteStream(destination + path.sep + unarchivedFileName);

  pipeline(
      readStream,
      transform,
      writeStream,
      () => {}
  );
}