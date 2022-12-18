import fs from "fs/promises";
import path from "path";
import { transfromPath } from "./utils/transfromPath.js";


export const navListener = async (commands) => {

  switch (commands[0]) {
    case 'ls':
      const files = await fs.readdir(process.env.homedir);
      const filesStats = await Promise.all(files.map((file) => fs.stat(process.env.homedir + path.sep + file)));

      const filesToShow = files.map((file, i) => {
        return {
          name: file,
          type: filesStats[i].isDirectory() ? 'directory' : 'file',
        }
      })
      console.table(filesToShow)
      break;
    case 'up':
      const splitedCurrDir = process.env.homedir.split(path.sep);
      if(splitedCurrDir <= 1){
        console.log(process.env.homedir);
        break;
      }
      process.env.homedir = splitedCurrDir.filter((_, i) => i !== splitedCurrDir.length - 1).join(path.sep);
      console.log(process.env.homedir);
      break;
    case 'cd':
      try{
        const newPath = transfromPath(commands[1])
        await fs.readdir(newPath);
        process.env.homedir = newPath;
        console.log(process.env.homedir);
      }catch{
        console.log("\x1b[31m", new Error('Invalid input'));
      }
      break
    default:
      break;
  }
};