// console.log(process.argv)
import os from 'os';
import path from 'path';
import { mainCommands } from './constants/commands.js';
import { fsListener } from './fs.js';
import { navListener } from './nav.js';
import { osListener } from './os.js';
import { calculateHash } from './utils/calculateHash.js';
import { parseCliArgs } from "./utils/parseCliArgs.js";
import { transfromPath } from './utils/transfromPath.js';
import { unzip } from './utils/unzip.js';
import { zip } from './utils/zip.js';

const {'--username': username} = parseCliArgs(process.argv);
console.log(`Welcome to the File Manager, ${username}!`);
process.env.homedir = os.homedir();
console.log(process.env.homedir);

const exit = () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
}

process.stdin.on('data', (data) => {
  const commands = data.toString().replace(/(\r\n|\n|\r)/gm, "").split(' ');
  const [frst, ...rest] = commands;

  switch (true) {
    case mainCommands.navigation.includes(frst):
      navListener(commands);
      break;
    case mainCommands.fs.includes(frst):
      fsListener(commands);
      break;
    case mainCommands.os.includes(frst):
      osListener(commands)
      break;
    case mainCommands.hash.includes(frst):
      const currPath = transfromPath(commands[1]);
      calculateHash(currPath).then(console.log);
      break;
    case mainCommands.zip.includes(frst):
      const zipPath = commands[1] && transfromPath(commands[1]);
      const zipDest = commands[2] && transfromPath(commands[2]);
      if(!zipPath && !zipDest){
        console.log("\x1b[31m", new Error('Invalid input'));
        break;
      }
      switch (frst) {
        case 'compress':
          zip(zipPath, zipDest);
          break;
        case 'decompress':
          unzip(zipPath, zipDest);
          break;
        
        default:
          console.log("\x1b[31m", new Error('Invalid input'));
          break;
      }
      break;
    case frst.includes('exit'):
      exit()
      break;
    default:
      console.log("\x1b[31m", new Error('Invalid input'));
      break;
  }
});

process.on('SIGINT', exit);

