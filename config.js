var env = (process.env.NODE_ENV || 'DEVELOPMENT').toLowerCase();
var fileName = './configuration/' + env +'.json';
var cfg = require(fileName);

module.exports = cfg;
