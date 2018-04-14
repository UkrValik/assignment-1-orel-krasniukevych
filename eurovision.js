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

const points = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1];

const resultPoints = {};
for (let i = 1; i <= data[0][0]; i++) {
  resultPoints[data[i][0]] = 0;
}
// console.log(resultPoints);

function comparePoints(arr) {
  for (let i = 1; i <= arr[0][0]; i++) {
    const sortedData = [];
    for (let j = 1; j <= arr[0][0]; j++) {
      sortedData[j-1] = arr[j][i];
    }
    sortedData.sort((x, y) => (y - x));
    // console.log(sortedData);
    for (let p in points) {
      for (let k = 1; k <= arr[0][0]; k++) {
        if (sortedData[p] === arr[k][i]) {
          resultPoints[arr[k][0]] += points[p];
        }
      }
    }
  }
}

comparePoints(data);
// console.log(resultPoints);

const sortedPoints = Object.values(resultPoints).sort((x, y) => (y - x));
// console.log(sortedPoints);

const results = [];
const check = [];
for (let i = 0; i < 10; i++) {
  for (let j in resultPoints) {
    if (resultPoints[j] === sortedPoints[i] && !check.includes(j)) {
      results[i] = [i+1, j, resultPoints[j]];
      check.push(j);
      // console.log(check);
      break;
    }
  }
}
// console.log(results);

const fs = require('fs')
// fs.writeFileSync(__dirname + '/result.txt', results.map(str => str.join(' ')).join('\n'), 'utf8');
fs.writeFileSync(__dirname + '/result.csv', results.map(str => str.join()).join('\n'), 'utf8');
