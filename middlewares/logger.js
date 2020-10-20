const winston = require('winston');
const expressWinston = require('express-winston');
const path = require('path');

// expressWinston.requestWhitelist.push('body');
const dirPath = path.join(__dirname, '../logs');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: path.join(dirPath, 'request.log') }),
    // new winston.transports.Console()
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: path.join(dirPath, 'error.log') }),
    // new winston.transports.Console()
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
