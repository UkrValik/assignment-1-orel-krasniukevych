'use strict';

const data = require('fs')
  .readFileSync(__dirname + '/eurovision.csv', 'utf8')
  .split('\n')  // ['20', 'Austria, 12345, 23456, ...', 'Ukraine, ...']
  .map((string, indexGlob) => string
    .split(',')   // [['20'], ['Austria', '12345', '23456', ...], ['Ukraine', ...], ...]
    .map((dataChunk, index) =>
      index > 0 || indexGlob === 0 ? parseInt(dataChunk) : dataChunk
    ) // [[20], ['Austria', 12345, 23456, ...], ['Ukraine', ...], ...]]
  );

const res = {};
data.forEach((dataChunk, index) => {
  if (index > 0) res[dataChunk[0]] = 0;
}); // res = {Austria: 0, Albania: 0, ...}
const resTable = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1];

for (let counterGlobal = 1; counterGlobal <= data[0][0]; counterGlobal++) {
  for (const pointer of resTable) {
    let max = data[1][counterGlobal]; // 0
    let maxIndex = 1;
    for (let counter = 1; counter <= data[0][0]; counter++) { // 0, 173494, 255438, 58888 ...
      if (data[counter][counterGlobal] > max) {
        max = data[counter][counterGlobal];
        maxIndex = counter;
      }
    }
    data[maxIndex][counterGlobal] = 0; //data[6][1] = 0 (Czech Republic)
    res[data[maxIndex][0]] += pointer;
  }
}
require('fs').writeFileSync(__dirname + '/output.txt', '', 'utf8');
for (let resCounter = 0; resCounter < 10; resCounter++) {
  const arrayRes = Object.entries(res);
  let max = arrayRes[0][1];
  let countryCountWiner;
  for (const iteratorKey of arrayRes) {
    if (max < iteratorKey[1]) {
      max = iteratorKey[1];
      countryCountWiner = iteratorKey[0];
    }
  }
  output(countryCountWiner + '\n');
  res[countryCountWiner] = 0;
}
console.log(require.cache);

function output(data) {
  require('fs').open(__dirname + '/output.txt', 'a', (err, fd) => {
    require('fs').write(fd, data, 'utf8', (err) => {
      if (err) console.log('Output error');
    });
  });
}
