// console.log(process.argv)
import os from 'os';
import path from 'path';
import { mainCommands } from './constants/commands.js';
import { fsListener } from './fs.js';
import { navListener } from './nav.js';
import { osListener } from './os.js';
import { parseCliArgs } from "./utils/parseCliArgs.js";

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
      // console.log('os')
      osListener(commands)
      break;
    case mainCommands.hash.includes(frst):
      console.log('first')
      break;
    case mainCommands.zip.includes(frst):
      console.log('first')
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

