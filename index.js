const chalk = require('chalk');
const readline = require('readline');
const figlet = require('figlet');
const clear = require('clear');
const stdin = process.stdin;
const stdout = process.stdout;

clear();
console.log(
  chalk.yellow(
    figlet.textSync('exType', { horizontalLayout: 'full' })
  ) + '\n'
);

readline.emitKeypressEvents(process.stdin);
stdin.setRawMode(true);

let startTime = undefined;
let given = 'abcdefghijklmnopqrstuvwxyz';
let entered = '';
let init = false;
let preE = '> ';

function setEvent() {
  stdin.on('keypress', (str, key) => {
    if (startTime === undefined) {
      startTime = new Date();
    }

    if (key.ctrl && key.name === 'c') {
      process.exit();
    } else if (key.name === 'return') {
      result (given === entered, new Date() - startTime);
    } else if (key.name === 'backspace') {
      entered = entered.slice(0, -1);
      readline.clearLine(stdout, 0);
      readline.cursorTo(stdout, 0);
      stdout.write(preE + chalk.cyan(entered));
    } else if (key.name.length > 1) {
      return;
    } else {
      stdout.write(chalk.cyan(str));
      entered += str;
    }
  });
}

function exType(q) {
  if (!init) {
    init = true;
    setEvent();
  }
  startTime = undefined;
  given = q;
  entered = '';
  stdout.write('= ' + chalk.yellow(q) + '\n' + preE);
}

const result = (b, time) => {
  let color = (b && time < 5000) ? 'green' : 'red';
  console.log('\n\n');
  if (!b) console.log(chalk[color].bold('Not match!'));
  console.log(chalk[color].bold(time/1000 + 's'));
  console.log('\n');
  exType(given);
}


exType(given);
