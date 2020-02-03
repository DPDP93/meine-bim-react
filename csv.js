const csv = require('csv-parser');
const fs = require('fs');
let results = [];

fs.createReadStream('data.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    results.map(h => {
        console.log(h);
    })
});

