
const { config } = require('dotenv')
config()
const isOffline = process.env.IS_OFFLINE === 'true';
const db = isOffline ? {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  userName: process.env.DB_USER,
  password:  process.env.DB_PASSWORD,
  database:  process.env.DB_NAME,
} : {
  host: process.env.AURORA_HOST,
  port: process.env.AURORA_PORT || 3306,
  userName: process.env.AURORA_USERNAME,
  password:  process.env.AURORA_PASSWORD,
  database:  process.env.AURORA_DB_NAME,
}
module.exports = {
  dialect: 'mysql',
  host: db.host,
  port: parseInt(db.port, 10),
  username: db.userName,
  password: db.password,
  database: db.database,
  pool: {
    max: 5,
    min: 0,
  },
  dialectOptions: {
    connectTimeout: 60000,
    
  },
}

