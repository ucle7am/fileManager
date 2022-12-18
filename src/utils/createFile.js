import fs from'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import { checkIsPathExists } from './checkIsPathExists.js';
// import { checkIsPathExists } from './utils.js';


// const __filename = fileURLToPath(import.meta.url);

export const createFile = async (filename, dirPath, text = '') => {
        const fileExt = path.extname(filename);
        const newFilePath = `${dirPath}${path.sep}${fileExt ? filename : filename + '.txt'}`;
        const isFileExists = await checkIsPathExists(newFilePath);

        if(isFileExists){
            // throw new Error('FS operation failed');
            console.log("\x1b[31m", new Error('File is allready exists'));
            return;
        }
      
        fs.appendFile(newFilePath, text);
        console.log('The file is succesfully created at: ' + newFilePath)
};
