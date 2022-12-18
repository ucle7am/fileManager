import os from 'os';

export const osListener = (commands) => {
  switch (commands[1]) {
    case '--EOL':
      console.log(JSON.stringify(os.EOL));
      break;
    case '--cpus':
      console.log('Number of threads:', os.cpus().length)
      os.cpus().forEach(cpu => {
        console.log(cpu.model.trim(), ` ${cpu.speed / 1000} Ghz`);
      })
      break;
    case '--homedir':
      console.log(os.homedir());
      break;
    case '--username':
      console.log(os.userInfo().username);
      break;
    case '--architecture':
      console.log(os.arch());
      break;
    default:
      console.log("\x1b[31m", new Error('Invalid input'));
      break;
  }


};
