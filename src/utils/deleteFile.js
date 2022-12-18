import fs from'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import { checkIsPathExists } from './checkIsPathExists.js';
// import { checkIsPathExists } from './utils.js';

const __filename = fileURLToPath(import.meta.url);

export const deleteFile = async (fileToRemovePath) => {
    const isExists = await checkIsPathExists(process.env.homedir + path.sep + fileToRemovePath);

    if(!isExists){
      console.log("\x1b[31m", new Error('File is does not exist'));
    }

    fs.unlink(process.env.homedir + path.sep + fileToRemovePath);
    console.log("The file was succesfully deleted");
};
