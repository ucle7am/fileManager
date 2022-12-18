import fs from'fs/promises';
import path from 'path';
import { checkIsPathExists } from './checkIsPathExists.js';

export const renameFile = async (fileName, newFileName) => {
    const isNewExists = await checkIsPathExists(process.env.homedir + path.sep + newFileName);
    const isOldExists = await checkIsPathExists(process.env.homedir + path.sep + fileName);

    if(isNewExists){
      console.log("\x1b[31m", new Error('File is allready exists'));
      return;
    }
    if(!isOldExists){
      console.log("\x1b[31m", new Error('File is does not exist'));
      return;
    }
    await fs.rename(process.env.homedir + path.sep + fileName, process.env.homedir + path.sep + newFileName)
    console.log('The file wan succesfully renamed');

};
