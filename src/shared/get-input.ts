import path = require('path');
import fs = require('fs');

export function getInput(day: number): string {
  return fs.readFileSync(path.resolve(`./input/${day}.txt`)).toString();
}
