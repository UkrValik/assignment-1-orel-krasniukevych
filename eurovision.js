'use strict';

const data = require('fs')
  .readFileSync(__dirname + '/eurovision.csv', 'utf8')
  .split('\n')
  .map((str, i) => str
     .split(',')
     .map((element, j) =>
       j > 0 || i === 0 ? parseInt(element) : element
   )
  );
data.pop();

const fs = require('fs')
// fs.writeFileSync('./eurovision1.txt', data.map(str => str.join(' ')).join('\n'), 'utf8');
fs.writeFileSync('./eurovision1.csv', data.map(str => str.join()).join('\n'), 'utf8');
