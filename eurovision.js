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

// console.log(data);
