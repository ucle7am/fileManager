import fs from'fs';
import { fileURLToPath } from 'url';
import path from 'path';
// import { checkIsPathExists } from './utils.js';
import { checkIsPathExists } from './checkIsPathExists.js';
import { createFile } from './createFile.js';
import { transfromPath } from './transfromPath.js';

const __filename = fileURLToPath(import.meta.url);

export const copyFile = async (filePath, newDir) => {

    const fileName = transfromPath(filePath);
    const newDirectoryPath = transfromPath(newDir);

    console.log(newDirectoryPath)

    const isDirectoryExists = await checkIsPathExists(newDirectoryPath);
    const isFileExists = await checkIsPathExists(fileName);

    if(!isDirectoryExists){
      console.log("\x1b[31m", new Error('Dir does not exists'));
      return false;
    }
    if(!isFileExists){
      console.log("\x1b[31m", new Error('File does not exist'));
      return false;
    }

    await createFile(path.basename(filePath), newDirectoryPath);

    const readStream = fs.createReadStream(fileName);
    const writeStream = fs.createWriteStream(newDirectoryPath + path.sep + path.basename(filePath));

    readStream.pipe(writeStream);


    readStream.on('error', () => {
      console.log("\x1b[31m", new Error('Copy error'));
    });
    writeStream.on('error', () => {
      console.log("\x1b[31m", new Error('Copy error'));
    });
  
    readStream.on('end', () => {
      readStream.close();
      writeStream.close();
    })
    return true;
};
