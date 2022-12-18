import fs from "fs";
import path from "path";
import { copyFile } from "./utils/copyFile.js";
import { createFile } from "./utils/createFile.js";
import { deleteFile } from "./utils/deleteFile.js";
import { moveFile } from "./utils/moveFile.js";
import { renameFile } from "./utils/renameFile.js";
import { transfromPath } from "./utils/transfromPath.js";

export const fsListener = async (commands) => {
  switch (commands[0]) {
    case 'cat':
        const newPath = transfromPath(commands[1])
        const fileStream = fs.createReadStream(newPath);
        fileStream.on('data', (chunk) => {
          console.log(chunk.toString());
        })
        fileStream.on('error', () => {
          console.log("\x1b[31m", new Error('Invalid input'));
        })
        fileStream.on('end', () => {
          fileStream.close()
        })

      break;
    case 'add':
      createFile(commands[1], process.env.homedir, commands.slice(2).join(' '));
      break;
    case 'rn':
      renameFile(commands[1], commands[2]);
      break;
    case 'cp':
      copyFile(commands[1], commands[2]);
      break;
    case 'mv':
      moveFile(commands[1], commands[2]);
      break;
    case 'rm':
      deleteFile(commands[1]);
      break;
    default:
      console.log("\x1b[31m", new Error('Invalid input'));
      break;
  }
};

