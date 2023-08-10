const fs = require('fs');
const path = require('path');

function logger(fileName, obj) {
  const logPath = path.resolve(process.cwd(), fileName);

  fs.readFile(logPath, (err, data) => {
    let logs = { table: [] };

    if (!err && data && data.length > 0) {
      try {
        logs = JSON.parse(data.toString());
      } catch (parseErr) {
        console.log('Error parsing JSON:', parseErr);
      }
    }

    logs.table.push(obj);

    fs.writeFile(logPath, JSON.stringify(logs), (writeErr) => {
      if (writeErr) {
        console.log('Error writing to file:', writeErr);
      }
    });
  });
}

function apiLogger(req, res, next) {
  const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

  logger('request.log', {
    url,
    date: new Date(),
  });

  next();
}

module.exports = { apiLogger, logger };
