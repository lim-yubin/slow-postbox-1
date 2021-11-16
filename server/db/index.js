const mysql = require('mysql2');

const dotenv = require('dotenv');
const config = require('../config/config');
dotenv.config();

const pool = mysql.createPool(config[process.env.NODE_ENV || 'development']);

const db = pool.promise();

module.exports = db;
