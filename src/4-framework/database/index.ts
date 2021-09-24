import { Sequelize, Options } from 'sequelize'
import dynamoose from 'dynamoose'

console.log('initializing sequelizee')
const isOffline = process.env.IS_OFFLINE === 'true'

const db = isOffline
  ? {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      userName: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    }
  : {
      host: process.env.AURORA_HOST,
      port: process.env.AURORA_PORT || 3306,
      userName: process.env.AURORA_USERNAME,
      password: process.env.AURORA_PASSWORD,
      database: process.env.AURORA_DB_NAME,
    }
const dbConnection: Options = {
  dialect: 'mysql',
  host: db.host,
  port: parseInt(String(db.port), 10),
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

if (isOffline) {
  const host = process.env.LOCALSTACK_HOST || 'localhost'

  const port = process.env.LOCALSTACK_PORT || '4566'

  console.log('running locally', host, port)
  dynamoose.aws.sdk.config.update({
    accessKeyId: 'DEFAULT_ACCESS_KEY',
    secretAccessKey: 'DEFAULT_SECRET_ACCESS_KEY',
  })

  dynamoose.aws.ddb.local(`http://${host}:${port}`)
}
