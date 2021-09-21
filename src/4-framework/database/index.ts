import { Sequelize, Options } from 'sequelize'
import { config } from 'dotenv'
console.log('initializing sequelize')

config()

const db = {
  host: 'db',
  port: '3306',
  userName: 'root',
  password: 'docker',
  database: 'database',
}

// if (process.env.STAGE === 'local') {
//   db.host = process.env.DB_HOST || 'localhost'
//   db.port = process.env.DB_PORT || '5432'
//   db.userName = process.env.DB_USER || 'postgres'
//   db.password = process.env.DB_PASSWORD || 'password'
//   db.database = process.env.DB_NAME || 'cartos'
// }

const dbConnection: Options = {
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

export const sequelize = new Sequelize(dbConnection)
